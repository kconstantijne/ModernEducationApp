
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const concepts = {
    sketch: {
      title: 'Ескіз — план майбутнього предмета',
      description: 'Ескіз допомагає визначити форму, пропорції та важливі деталі ще до роботи в 3D-редакторі. Він може бути простим, але має передавати головну ідею.',
      note: 'Перед моделюванням намалюй предмет і познач, де будуть отвори, виступи та місця з’єднання.',
      status: 'Сформулюй задум і визнач, які частини потрібні моделі.'
    },
    solid: {
      title: '3D-форма має три виміри',
      description: 'Тривимірна модель має ширину, висоту й глибину. У редакторі можна змінювати розмір і положення форм та оглядати їх з різних боків.',
      note: 'Якщо деталь здається правильною спереду, перевір її збоку й зверху: так легше помітити помилки.',
      status: 'Зміни розмір основи та порівняй вигляд моделі.'
    },
    group: {
      title: 'Групування поєднує форми',
      description: 'Кілька простих тіл можна розмістити поруч або перетнути, а потім згрупувати. Форма, позначена як отвір, може вирізати частину іншої форми.',
      note: 'Перш ніж групувати, перевір розташування деталей. Неправильно поставлений отвір може прорізати модель наскрізь не там, де потрібно.',
      status: 'Додай деталі й отвір, щоб побачити, як змінюється конструкція.'
    },
    print: {
      title: '3D-друк перетворює модель на предмет',
      description: 'Цифрову модель експортують у формат, який підтримує програма підготовки до друку. Слайсер ділить об’єкт на шари й допомагає перевірити параметри друку.',
      note: 'Перед друком перевір розміри, тонкі елементи та цілісність моделі. Навчальна оцінка на цій сторінці не замінює слайсер.',
      status: 'Перевір готовність моделі та зверни увагу на її розмір і деталі.'
    }
  };

  const levelNames = {
    easy: 'Простий рівень',
    medium: 'Середній рівень',
    hard: 'Складний рівень'
  };

  const rewardByLevel = { easy: 10, medium: 15, hard: 20 };

  const questions = {
    easy: [
      {
        q: 'Що таке 3D-модель?',
        a: ['Малюнок лише олівцем', 'Цифрове зображення об’єкта з трьома вимірами', 'Список команд для гри', 'Фотографія без розмірів'],
        correct: 1,
        why: '3D-модель описує об’ємний об’єкт, який має ширину, висоту й глибину.'
      },
      {
        q: 'Для чого потрібен ескіз?',
        a: ['Щоб одразу надрукувати предмет', 'Щоб змінити колір екрана', 'Щоб спланувати форму й деталі до моделювання', 'Щоб вимкнути 3D-редактор'],
        correct: 2,
        why: 'Ескіз фіксує задум і допомагає спланувати форму перед побудовою моделі.'
      },
      {
        q: 'Яка дія допомагає зробити предмет об’ємним у 3D-редакторі?',
        a: ['Додати або змінити об’ємну форму', 'Збільшити гучність', 'Відкрити текстовий документ', 'Намалювати лише тінь'],
        correct: 0,
        why: '3D-об’єкт створюють із просторових форм, наприклад куба чи циліндра.'
      },
      {
        q: 'Що означає 3D-друк?',
        a: ['Друк лише кольорових фотографій', 'Копіювання екрана на папір', 'Створення малюнка олівцем', 'Виготовлення фізичного об’єкта за цифровою моделлю'],
        correct: 3,
        why: '3D-принтер створює фізичний об’єкт за цифровою моделлю, зазвичай додаючи матеріал шарами.'
      }
    ],
    medium: [
      {
        q: 'Ти створюєш брелок із кубічної основи. Як зробити місце для кільця?',
        a: ['Збільшити яскравість екрана', 'Розмістити форму-отвір у потрібному місці та вирізати її', 'Приховати всю модель', 'Зменшити масштаб перегляду й нічого не змінювати'],
        correct: 1,
        why: 'У редакторі на кшталт Tinkercad форма-отвір, розміщена в основі й згрупована з нею, вирізає порожнину.'
      },
      {
        q: 'Чому важливо перевіряти модель зверху, спереду й збоку?',
        a: ['Щоб додати більше кольорів', 'Щоб пришвидшити інтернет', 'Щоб помітити розташування та пропорції деталей у просторі', 'Щоб замінити ескіз'],
        correct: 2,
        why: 'Різні ракурси допомагають побачити форму й виявити деталі, які перекриваються з одного боку.'
      },
      {
        q: 'Що найкраще зробити перед початком моделювання підставки для олівців?',
        a: ['Намалювати ескіз і визначити розміри', 'Одразу експортувати порожній файл', 'Випадково розмістити фігури', 'Не думати про призначення предмета'],
        correct: 0,
        why: 'Ескіз і розміри допомагають узгодити форму з призначенням виробу.'
      },
      {
        q: 'Навіщо в 3D-моделі групують кілька форм?',
        a: ['Щоб видалити всі кольори', 'Щоб перетворити її на звичайне фото', 'Щоб приховати розміри', 'Щоб об’єднати елементи в одну конструкцію або застосувати вирізання'],
        correct: 3,
        why: 'Групування дає змогу працювати з кількома формами як з одним об’єктом і виконувати операції з отворами.'
      },
      {
        q: 'Що варто перевірити, якщо маленький виступ моделі дуже тонкий?',
        a: ['Лише назву проєкту', 'Чи достатня товщина для задуманої міцності та можливості друку', 'Чи є на сторінці анімація', 'Чи збігається колір із фоном'],
        correct: 1,
        why: 'Надто тонкі елементи можуть бути крихкими або складними для друку; допустима товщина залежить від принтера й матеріалу.'
      },
      {
        q: 'Який порядок роботи найбільш логічний?',
        a: ['Друк → задум → ескіз → модель', 'Експорт → видалення моделі → ескіз', 'Задум → ескіз → 3D-модель → перевірка → підготовка до друку', 'Випадкова форма → друк без перевірки'],
        correct: 2,
        why: 'Послідовний процес допомагає перейти від ідеї до перевіреної моделі та підготовки до виготовлення.'
      }
    ],
    hard: [
      {
        q: 'Отвір для кільця опинився за межами брелока. Що слід зробити?',
        a: ['Перемістити отвір так, щоб він перетинав основу в потрібному місці, і перевірити результат', 'Збільшити масштаб екрана й залишити як є', 'Експортувати модель без змін', 'Прибрати основу'],
        correct: 0,
        why: 'Для вирізання отвір має перетинатися з основою саме там, де потрібна порожнина.'
      },
      {
        q: 'Після групування модель виглядає суцільною, але отвір зник. Яка ймовірна причина?',
        a: ['Монітор надто яскравий', 'Модель має три виміри', 'Форма не була позначена як отвір або не перетинала основу належним чином', 'Ескіз зроблено на папері'],
        correct: 2,
        why: 'Щоб вирізання спрацювало, форму потрібно задати як отвір і правильно розташувати відносно основи перед групуванням.'
      },
      {
        q: 'Учень збільшив предмет у два рази, але забув збільшити отвір. Що може статися?',
        a: ['Файл автоматично стане фотографією', 'Отвір може виявитися замалим відносно предмета', 'У моделі зникне глибина', 'Друк обов’язково стане швидшим'],
        correct: 1,
        why: 'Зміна масштабу лише частини конструкції порушує пропорції. Розміри отвору слід перевіряти відносно всього виробу.'
      },
      {
        q: 'Який план найкраще підходить для моделі настільної підставки для телефона?',
        a: ['Створити багато випадкових куль', 'Відмовитися від перевірки кута й опори', 'Експортувати ескіз без 3D-моделі', 'Продумати основу, опорну спинку, паз або упор і перевірити стійкість'],
        correct: 3,
        why: 'Підставка має підтримувати телефон, не перекидатися й утримувати його в потрібному положенні.'
      },
      {
        q: 'Чому не можна вважати просту оцінку готовності в навчальній моделі гарантією успішного друку?',
        a: ['Бо справжній друк також залежить від принтера, матеріалу, геометрії та налаштувань слайсера', 'Бо всі 3D-моделі друкувати неможливо', 'Бо розміри не мають значення', 'Бо слайсер потрібен лише для малювання'],
        correct: 0,
        why: 'Для реального друку треба враховувати можливості конкретного обладнання, матеріал, підтримки та параметри слайсера.'
      },
      {
        q: 'У моделі є дві частини, які лише торкаються крихітною гранню. Який ризик варто перевірити?',
        a: ['Шрифт заголовка зміниться', 'Колір фону стане іншим', 'Частини можуть бути недостатньо надійно з’єднані для задуманої конструкції', 'Модель втратить назву'],
        correct: 2,
        why: 'Місце контакту має бути достатнім для потрібної міцності; просто дотичні поверхні не завжди утворюють надійне з’єднання.'
      },
      {
        q: 'Яка дія є найкращим прикладом ітеративного інженерного дизайну?',
        a: ['Не змінювати перший варіант, навіть якщо він не працює', 'Перевірити прототип, помітити проблему, змінити модель і випробувати знову', 'Одразу оцінити результат без тесту', 'Копіювати форму без розуміння її призначення'],
        correct: 1,
        why: 'Інженери вдосконалюють рішення через повторення циклу: спроєктувати, перевірити, знайти проблему й поліпшити.'
      },
      {
        q: 'Що найкраще перевірити перед передаванням моделі до слайсера?',
        a: ['Лише емодзі біля назви', 'Чи відкрита вкладка браузера', 'Чи є декоративна рамка на екрані', 'Масштаб, цілісність, тонкі ділянки та правильність експорту'],
        correct: 3,
        why: 'Перед підготовкою до друку важливо переконатися, що розміри й геометрія відповідають задуму, а файл експортувався правильно.'
      }
    ]
  };

  const state = {
    concept: 'sketch',
    level: 'easy',
    index: 0,
    correct: 0,
    answered: false,
    finished: false,
    rewardClaimed: false,
    stars: 0
  };

  const levelCards = $$('.level-card');
  const conceptCards = $$('.concept-card');
  const object = $('#cadObject');
  const detailInput = $('#detailInput');
  const rotation = { x: -22, y: 0, z: -35 };

  const threeState = {
    THREE: null,
    renderer: null,
    scene: null,
    camera: null,
    group: null,
    ready: false,
    raf: 0,
    resizeObserver: null
  };

  let currentModel = {
    type: 'keychain',
    size: 30,
    hasHole: true,
    detailCount: 1
  };

  function renderMinecraftLogo() {
    if (!object) return;

    const front = $('.cad-front', object);
    if (!front) return;

    front.style.background = 'linear-gradient(180deg, #626b56, #73736a 28%, #555750)';

    const top = $('.cad-top', object);
    const side = $('.cad-side', object);

    if (top) top.style.background = '#659447';
    if (side) side.style.background = '#3f4939';

    let plaque = $('.minecraft-logo-plaque', front);

    if (!plaque) {
      plaque = document.createElement('div');
      plaque.className = 'minecraft-logo-plaque';
      plaque.setAttribute('aria-hidden', 'true');

      Object.assign(plaque.style, {
        position: 'absolute',
        inset: '13px 5px auto',
        height: '42px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        padding: '3px 2px',
        boxSizing: 'border-box',
        background: '#263d2c',
        border: '2px solid #18261c',
        boxShadow: 'inset 0 0 0 1px #71945a',
        transform: 'translateZ(2px)',
        fontFamily: 'monospace',
        fontWeight: '900',
        color: '#f0f0e8',
        textShadow: '1px 1px 0 #202020'
      });

      const creeper = document.createElement('div');
      creeper.textContent = '■ ▪ ■';

      Object.assign(creeper.style, {
        color: '#7fc64a',
        fontSize: '8px',
        lineHeight: '8px',
        letterSpacing: '2px'
      });

      const wordmark = document.createElement('div');
      wordmark.className = 'minecraft-logo-wordmark';
      wordmark.textContent = 'MINECRAFT';

      Object.assign(wordmark.style, {
        fontSize: '9px',
        lineHeight: '11px',
        letterSpacing: '-.8px',
        whiteSpace: 'nowrap'
      });

      plaque.append(creeper, wordmark);
      front.append(plaque);
    }
  }

  function makeMaterial(THREE, color, roughness = 0.58, metalness = 0.02) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness
    });
  }

  function addBox(THREE, parent, x, y, z, w, h, d, color, bevel = false) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(
      geometry,
      makeMaterial(THREE, color, bevel ? 0.42 : 0.68)
    );

    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);

    return mesh;
  }

  function makeKeychainGeometry(THREE, hasHole) {
    const shape = new THREE.Shape();
    const w = 3.45;
    const h = 2.15;
    const r = 0.18;

    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    if (hasHole) {
      const hole = new THREE.Path();
      hole.absarc(-1.22, 0.58, 0.19, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      curveSegments: 16
    });
  }

  function addMinecraftLogo(THREE, parent) {
    addBox(THREE, parent, 0.30, -0.01, 0.205, 2.05, 1.02, 0.055, '#203326');
    addBox(THREE, parent, 0.30, -0.01, 0.237, 1.96, 0.93, 0.018, '#314a35');

    const px = 0.055;
    const creeper = [
      '11111',
      '11111',
      '10101',
      '11111',
      '01110',
      '01110',
      '01010'
    ];

    const cx = 0.30 - 2.5 * px;
    const cy = 0.235;

    creeper.forEach((row, y) => {
      [...row].forEach((bit, x) => {
        if (bit === '1') {
          addBox(
            THREE,
            parent,
            cx + x * px,
            cy - y * px,
            0.258,
            px * 0.88,
            px * 0.88,
            0.018,
            '#79b84b'
          );
        }
      });
    });

    const glyphs = {
      M: ['101', '111', '111', '101', '101'],
      I: ['111', '010', '010', '010', '111'],
      N: ['101', '111', '111', '111', '101'],
      E: ['111', '100', '110', '100', '111'],
      C: ['111', '100', '100', '100', '111'],
      R: ['110', '101', '110', '101', '101'],
      A: ['010', '101', '111', '101', '101'],
      F: ['111', '100', '110', '100', '100'],
      T: ['111', '010', '010', '010', '010']
    };

    const word = 'MINECRAFT';
    const pixel = 0.042;
    const step = 0.051;
    const wordWidth =
      word.length * 3 * step -
      (step - pixel) +
      (word.length - 1) * 0.004;

    const startX = 0.30 - wordWidth / 2;
    const yTop = -0.17;

    [...word].forEach((letter, index) => {
      glyphs[letter].forEach((row, y) => {
        [...row].forEach((bit, x) => {
          if (bit === '1') {
            addBox(
              THREE,
              parent,
              startX + index * (3 * step + 0.004) + x * step,
              yTop - y * step,
              0.259,
              pixel,
              pixel,
              0.022,
              '#f0f0e8'
            );
          }
        });
      });
    });
  }

  function addMinecraftLogoOnBlock(THREE, parent) {
    addBox(THREE, parent, 0, 0, 1.19, 1.85, 0.92, 0.045, '#263d2c');

    const glyphs = {
      M: ['101', '111', '111', '101', '101'],
      I: ['111', '010', '010', '010', '111'],
      N: ['101', '111', '111', '111', '101'],
      E: ['111', '100', '110', '100', '111'],
      C: ['111', '100', '100', '100', '111'],
      R: ['110', '101', '110', '101', '101'],
      A: ['010', '101', '111', '101', '101'],
      F: ['111', '100', '110', '100', '100'],
      T: ['111', '010', '010', '010', '010']
    };

    const word = 'MINECRAFT';
    const px = 0.038;
    const step = 0.046;
    const start = -(
      (word.length * 3 * step + (word.length - 1) * 0.004) / 2
    );

    [...word].forEach((letter, i) => {
      glyphs[letter].forEach((row, y) => {
        [...row].forEach((bit, x) => {
          if (bit === '1') {
            addBox(
              THREE,
              parent,
              start + i * (3 * step + 0.004) + x * step,
              0.13 - y * step,
              1.22,
              px,
              px,
              0.018,
              '#f0f0e8'
            );
          }
        });
      });
    });
  }

  function buildThreeModel() {
    if (!threeState.ready) return;

    const THREE = threeState.THREE;
    const group = threeState.group;

    while (group.children.length) {
      const child = group.children[0];
      group.remove(child);

      child.traverse?.(node => {
        node.geometry?.dispose?.();

        if (Array.isArray(node.material)) {
          node.material.forEach(material => material.dispose?.());
        } else {
          node.material?.dispose?.();
        }
      });
    }

    const { type, hasHole, detailCount = 0 } = currentModel;

    if (type === 'block') {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 2.3, 2.3),
        makeMaterial(THREE, '#5f8d49')
      );

      block.position.z = 0;
      block.castShadow = true;
      group.add(block);

      addBox(THREE, group, 0, 0, 1.17, 1.7, 0.82, 0.06, '#263d2c');
      addMinecraftLogoOnBlock(THREE, group);
    } else if (type === 'stand') {
      addBox(THREE, group, 0, -0.72, 0.05, 2.9, 0.22, 2.0, '#4d8e52');

      const back = addBox(
        THREE,
        group,
        0,
        0.05,
        -0.48,
        2.35,
        1.75,
        0.22,
        '#66994e'
      );

      back.rotation.x = -0.28;

      addBox(THREE, group, 0, -0.43, 0.78, 2.45, 0.28, 0.32, '#263d2c');
      addBox(THREE, group, -0.88, -0.32, 0.48, 0.28, 0.46, 0.48, '#5b8d45');
      addBox(THREE, group, 0.88, -0.32, 0.48, 0.28, 0.46, 0.48, '#5b8d45');
    } else {
      const geometry = makeKeychainGeometry(THREE, hasHole);
      const base = new THREE.Mesh(
        geometry,
        makeMaterial(THREE, '#62685a', 0.38, 0.06)
      );

      base.position.z = -0.14;
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      addMinecraftLogo(THREE, group);
    }

    for (let i = 0; i < detailCount; i += 1) {
      const count = Math.max(detailCount, 1);
      const x = (i - (count - 1) / 2) * 0.42;
      const color = i % 2 ? '#79b84b' : '#a1b86c';

      if (type === 'keychain') {
        addBox(THREE, group, x + 0.30, -0.82, 0.245, 0.22, 0.18, 0.055, color);
      } else if (type === 'block') {
        addBox(THREE, group, x, -0.78, 1.19, 0.22, 0.22, 0.08, color);
      } else if (type === 'stand') {
        addBox(THREE, group, x, -0.585, 0.58, 0.20, 0.07, 0.20, color);
      }
    }

    group.scale.setScalar(currentModel.size / 30);
    applyRotation();
  }

  function renderThreeFrame() {
    if (!threeState.ready) return;

    threeState.renderer.render(threeState.scene, threeState.camera);
    threeState.raf = window.requestAnimationFrame(renderThreeFrame);
  }

  function resizeThreeScene() {
    if (!threeState.ready) return;

    const stage = $('#cadStage');
    if (!stage) return;

    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);

    threeState.renderer.setSize(width, height, false);
    threeState.camera.aspect = width / height;
    threeState.camera.updateProjectionMatrix();
  }

  function initThreeScene() {
    const stage = $('#cadStage');
    if (!stage || !object) return;

    const start = () => {
      if (!window.THREE || threeState.ready) return;

      const THREE = window.THREE;
      threeState.THREE = THREE;
      threeState.scene = new THREE.Scene();

      threeState.camera = new THREE.PerspectiveCamera(
        34,
        stage.clientWidth / Math.max(stage.clientHeight, 1),
        0.1,
        100
      );

      threeState.camera.position.set(0, 0.15, 7.4);
      threeState.camera.lookAt(0, 0, 0);

      threeState.scene.add(new THREE.HemisphereLight('#ffffff', '#6b735e', 2.0));

      const keyLight = new THREE.DirectionalLight('#ffffff', 3.2);
      keyLight.position.set(-3.5, 4.5, 6);
      threeState.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight('#a9c8ff', 1.1);
      fillLight.position.set(4, -2, 3);
      threeState.scene.add(fillLight);

      threeState.group = new THREE.Group();
      threeState.scene.add(threeState.group);

      try {
        threeState.renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true
        });

        threeState.renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, 2)
        );
        threeState.renderer.setClearColor(0x000000, 0);
        threeState.renderer.outputColorSpace = THREE.SRGBColorSpace;

        threeState.renderer.domElement.setAttribute(
          'aria-label',
          'Об’ємна 3D-модель брелока Minecraft'
        );

        Object.assign(threeState.renderer.domElement.style, {
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: '2',
          outline: 'none',
          pointerEvents: 'auto',
          cursor: 'grab',
          touchAction: 'none'
        });

        stage.appendChild(threeState.renderer.domElement);
        $$('.axis', stage).forEach(axis => {
          axis.style.zIndex = '3';
        });

        threeState.ready = true;
        object.style.visibility = 'hidden';

        const shadow = $('.cad-shadow', stage);
        if (shadow) shadow.style.opacity = '0.25';

        buildThreeModel();
        resizeThreeScene();

        if ('ResizeObserver' in window) {
          threeState.resizeObserver = new ResizeObserver(resizeThreeScene);
          threeState.resizeObserver.observe(stage);
        } else {
          window.addEventListener('resize', resizeThreeScene);
        }

        renderThreeFrame();

        setStatus(
          'Затисни ліву кнопку миші на моделі й потягни, щоб обертати її. На сенсорному екрані можна перетягувати пальцем. Для друку потрібен експорт моделі з CAD-редактора.'
        );
      } catch (error) {
        console.warn('Three.js renderer could not be started; using CSS preview.', error);
        object.style.visibility = 'visible';
      }
    };

    if (window.THREE) {
      start();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.async = true;
    script.onload = start;
    script.onerror = () => {
      setStatus(
        'Не вдалося завантажити Three.js. Показано резервний CSS-перегляд; перевір підключення до інтернету.',
        'warning'
      );
    };

    document.head.appendChild(script);
  }

  function applyRotation() {
    if (object) {
      const scale = object.style.getPropertyValue('--model-scale') || '1';

      object.style.transform =
        `translate(-50%, -50%) scale(${scale}) ` +
        `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
    }

    if (threeState.ready && threeState.group) {
      threeState.group.rotation.set(
        THREE_DEG_TO_RAD(rotation.x),
        THREE_DEG_TO_RAD(rotation.y),
        THREE_DEG_TO_RAD(rotation.z),
        'XYZ'
      );
    }

    ['x', 'y', 'z'].forEach(axis => {
      const value = $(`#rotation${axis.toUpperCase()}Value`);
      if (value) value.textContent = `${rotation[axis]}°`;
    });
  }

  function THREE_DEG_TO_RAD(degrees) {
    return degrees * Math.PI / 180;
  }

  function setupMouseRotation() {
    const stage = $('#cadStage');
    if (!stage || !object) return;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let activePointerId = null;

    stage.style.cursor = 'grab';
    stage.style.touchAction = 'none';

    stage.addEventListener('pointerdown', event => {
      const canvas = threeState.renderer?.domElement;
      const hitCanvas = canvas && (
        event.target === canvas || canvas.contains(event.target)
      );
      const hitFallbackModel = object.contains(event.target) || event.target === object;

      if (!hitCanvas && !hitFallbackModel) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      if (hitCanvas && threeState.ready && threeState.group) {
        const rect = canvas.getBoundingClientRect();

        const pointer = new threeState.THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new threeState.THREE.Raycaster();
        raycaster.setFromCamera(pointer, threeState.camera);

        if (raycaster.intersectObject(threeState.group, true).length === 0) {
          return;
        }
      }

      dragging = true;
      activePointerId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;

      stage.style.cursor = 'grabbing';
      if (canvas) canvas.style.cursor = 'grabbing';

      try {
        stage.setPointerCapture(event.pointerId);
      } catch (_) {}

      event.preventDefault();
    });

    stage.addEventListener('pointermove', event => {
      if (!dragging || event.pointerId !== activePointerId) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;

      lastX = event.clientX;
      lastY = event.clientY;

      rotation.y += dx * 0.75;
      rotation.x += dy * 0.75;

      applyRotation();
      event.preventDefault();
    });

    const stopDragging = event => {
      if (!dragging || (event && event.pointerId !== activePointerId)) return;

      dragging = false;
      activePointerId = null;
      stage.style.cursor = 'grab';

      if (threeState.renderer?.domElement) {
        threeState.renderer.domElement.style.cursor = 'grab';
      }

      try {
        if (event) stage.releasePointerCapture(event.pointerId);
      } catch (_) {}
    };

    stage.addEventListener('pointerup', stopDragging);
    stage.addEventListener('pointercancel', stopDragging);
    stage.addEventListener('lostpointercapture', stopDragging);
    stage.addEventListener('dragstart', event => event.preventDefault());
  }

  function setStatus(message, kind = '') {
    const node = $('#modelStatus');
    if (!node) return;

    node.replaceChildren();

    const dot = document.createElement('span');
    dot.className = 'status-dot';

    const text = document.createElement('span');
    text.textContent = message;

    node.append(dot, text);
    node.dataset.state = kind;
  }

  function updateConcept(key) {
    const item = concepts[key];
    if (!item) return;

    state.concept = key;

    conceptCards.forEach(card => {
      const active = card.dataset.concept === key;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
    });

    $('#labTitle').textContent = item.title;
    $('#labDescription').textContent = item.description;

    $('#conceptNote').replaceChildren();

    const icon = document.createElement('span');
    icon.className = 'note-icon';
    icon.textContent = '✦';

    const copy = document.createElement('span');
    const strong = document.createElement('strong');

    strong.textContent = 'Пам’ятай: ';
    copy.append(strong, document.createTextNode(item.note));
    $('#conceptNote').append(icon, copy);

    setStatus(item.status);
  }

  // ВИПРАВЛЕНИЙ РОЗРАХУНОК НАВЧАЛЬНОЇ ОЦІНКИ ГОТОВНОСТІ.
  function buildModel(announce = true) {
    const sizeInput = $('#sizeInput');
    const typeInput = $('#objectType');
    const resultNode = $('#modelResult');
    const captionNode = $('#resultCaption');
    const stage = $('#cadStage');
    const holeNode = $('#cadHole');
    const badgeNode = $('#barBadge');
    const highlightNode = $('#highlightPercent');

    if (!sizeInput || !typeInput || !detailInput || !object) {
      console.error('Не знайдено необхідні елементи 3D-моделі.');
      return false;
    }

    const rawSize = Number(sizeInput.value);

    if (!Number.isFinite(rawSize) || rawSize < 10 || rawSize > 60) {
      setStatus('Введи розмір від 10 до 60 умовних мм. Модель не змінено.', 'error');
      sizeInput.setAttribute('aria-invalid', 'true');
      return false;
    }

    sizeInput.removeAttribute('aria-invalid');

    const size = Math.round(rawSize / 5) * 5;
    sizeInput.value = String(size);

    const type = typeInput.value;
    const detailCount = Number(detailInput.value);
    const holeInput = $('#holeInput');
    const hasHole = Boolean(holeInput?.checked);

    if (!Number.isFinite(detailCount) || detailCount < 0) {
      setStatus('Перевір кількість додаткових деталей.', 'error');
      return false;
    }

    currentModel = { type, size, hasHole, detailCount };

    object.dataset.type = type;
    object.style.setProperty('--model-scale', String(size / 30));
    object.style.setProperty('--detail-count', String(detailCount));

    renderMinecraftLogo();

    if (stage) {
      stage.setAttribute(
        'aria-label',
        'Попередній перегляд 3D-моделі. Це візуальна демонстрація, а не готовий файл для 3D-друку.'
      );
    }

    object.querySelectorAll('.cad-detail').forEach(node => node.remove());

    for (let i = 0; i < detailCount; i += 1) {
      const detail = document.createElement('span');
      detail.className = 'cad-detail';
      detail.style.setProperty('--detail-index', String(i));
      detail.setAttribute('aria-hidden', 'true');
      object.append(detail);
    }

    if (holeNode) {
      holeNode.hidden = !hasHole || type === 'stand';
    }

    const typeNames = {
      keychain: 'Брелок Minecraft',
      block: 'Блок-конструктор',
      stand: 'Підставка для телефона'
    };

    if (badgeNode) {
      badgeNode.textContent = typeNames[type] || '3D-модель';
    }

    if (highlightNode) {
      highlightNode.textContent = `${size} мм`;
    }

    let score = 100;
    const warnings = [];

    // Перевірка розміру.
    if (size > 50) {
      score -= 15;
      warnings.push('великий розмір — перевір габарити принтера');
    } else if (size < 15) {
      score -= 10;
      warnings.push('малий розмір — перевір міцність деталей');
    }

    // Перевірка кількості деталей.
    if (detailCount >= 4) {
      score -= 10;
      warnings.push('багато додаткових деталей — перевір місця з’єднання');
    } else if (detailCount === 0) {
      score -= 5;
      warnings.push('немає додаткових деталей — перевір відповідність задуму');
    }

    // Перевірка отвору для брелока.
    if (type === 'keychain' && !hasHole) {
      score -= 25;
      warnings.push('для брелока бракує отвору для кільця');
    }

    // Перевірка розміру підставки.
    if (type === 'stand' && size < 20) {
      score -= 15;
      warnings.push('основа підставки може бути замалою для стійкості');
    }

    // Перевірка розміру блока.
    if (type === 'block' && size < 20) {
      score -= 10;
      warnings.push('перевір розмір декоративних елементів');
    }

    // Обмеження оцінки діапазоном 35–100%.
    score = Math.max(35, Math.min(100, Math.round(score)));

    // Оновлення значення оцінки в інтерфейсі.
    if (resultNode) {
      resultNode.textContent = `${score}%`;
      resultNode.setAttribute(
        'aria-label',
        `Навчальна оцінка готовності: ${score}%`
      );
      resultNode.dataset.score = String(score);
    }

    // Підпис відповідає поточному результату.
    if (captionNode) {
      if (score >= 85) {
        captionNode.textContent =
          'Навчальна оцінка готовності · модель добре підготовлена';
      } else if (score >= 65) {
        captionNode.textContent =
          'Навчальна оцінка готовності · перевір рекомендації';
      } else {
        captionNode.textContent =
          'Навчальна оцінка готовності · потрібні зміни';
      }
    }

    // Оновлення об’ємної моделі, якщо Three.js завантажився.
    if (threeState.ready) {
      buildThreeModel();
    }

    // Повідомлення відповідає вибраному типу моделі.
    if (announce) {
      if (warnings.length) {
        setStatus(
          `${typeNames[type] || '3D-модель'}: ${score}%. ` +
          `Є що перевірити: ${warnings.join('; ')}. ` +
          'Це навчальна оцінка, а не гарантія успішного 3D-друку.'
        );
      } else {
        setStatus(
          `${typeNames[type] || '3D-модель'} оновлено. ` +
          `Навчальна оцінка готовності: ${score}%. ` +
          'Перед друком перевір модель у CAD-редакторі та слайсері.'
        );
      }
    }

    return true;
  }

  function resetModel() {
    $('#objectType').value = 'keychain';
    $('#sizeInput').value = '30';
    detailInput.value = '1';

    const holeInput = $('#holeInput');
    if (holeInput) holeInput.checked = true;

    updateConcept('sketch');
    buildModel(false);
  }

  function renderQuestion() {
    const list = questions[state.level];
    const q = list[state.index];

    state.answered = false;

    $('#feedbackBox').hidden = true;
    $('#feedbackBox').textContent = '';
    $('#nextQuestion').disabled = true;

    $('#questionCounter').textContent =
      `Запитання ${state.index + 1} із ${list.length}`;

    $('#correctCounter').textContent = String(state.correct);
    $('#questionNumber').textContent =
      String(state.index + 1).padStart(2, '0');

    $('#questionText').textContent = q.q;

    const percent = Math.round(state.index / list.length * 100);
    $('#progressFill').style.width = `${percent}%`;
    $('#progressTrack').setAttribute('aria-valuenow', String(percent));

    const answerList = $('#answerList');
    answerList.replaceChildren();

    q.a.forEach((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-option';
      button.dataset.answer = String(index);
      button.setAttribute(
        'aria-label',
        `Варіант ${String.fromCharCode(65 + index)}: ${answer}`
      );

      const letter = document.createElement('span');
      letter.className = 'answer-letter';
      letter.textContent = String.fromCharCode(65 + index);

      const text = document.createElement('span');
      text.className = 'answer-text';
      text.textContent = answer;

      button.append(letter, text);
      button.addEventListener('click', () => chooseAnswer(index));
      answerList.append(button);
    });
  }

  function chooseAnswer(index) {
    if (state.answered || state.finished) return;

    const q = questions[state.level][state.index];

    if (!Number.isInteger(index) || index < 0 || index >= q.a.length) {
      return;
    }

    state.answered = true;

    const correct = index === q.correct;
    if (correct) state.correct += 1;

    $$('.answer-option', $('#answerList')).forEach((button, i) => {
      button.disabled = true;

      if (i === q.correct) {
        button.classList.add('is-correct');
      } else if (i === index) {
        button.classList.add('is-wrong');
      }
    });

    const box = $('#feedbackBox');
    box.hidden = false;
    box.classList.toggle('is-correct', correct);
    box.classList.toggle('is-wrong', !correct);

    const heading = document.createElement('strong');
    heading.textContent = correct
      ? 'Правильно! '
      : 'Спробуй запам’ятати. ';

    box.replaceChildren(heading, document.createTextNode(q.why));

    $('#correctCounter').textContent = String(state.correct);
    $('#nextQuestion').disabled = false;

    $('#nextQuestion').textContent =
      state.index === questions[state.level].length - 1
        ? 'Побачити результат →'
        : 'Наступне →';
  }

  function showResults() {
    state.finished = true;

    $('#quizActive').hidden = true;
    $('#quizResult').hidden = false;

    const total = questions[state.level].length;
    const percent = Math.round(state.correct / total * 100);
    const stars = rewardByLevel[state.level];

    $('#finalCorrect').textContent = `${state.correct}/${total}`;
    $('#finalPercent').textContent = `${percent}%`;
    $('#earnedStars').textContent = `+${stars}`;

    $('#resultTitle').textContent =
      percent === 100
        ? 'Безпомилкова робота!'
        : percent >= 70
          ? 'Чудова робота!'
          : percent >= 50
            ? 'Гарний поступ!'
            : 'Є простір для відкриттів!';

    $('#resultMessage').textContent =
      percent >= 70
        ? 'Ти добре розумієш, як планувати й перевіряти 3D-моделі. Зірочки можна отримати кнопкою нижче.'
        : 'Переглянь шпаргалку, повернися до пояснень і спробуй ще раз — інженери вчаться на кожній спробі.';

    $('#claimReward').disabled = false;

    $('#rewardNote').textContent =
      'Зірочки за завершену спробу можна отримати лише один раз.';

    $('#progressFill').style.width = '100%';
    $('#progressTrack').setAttribute('aria-valuenow', '100');
  }

  function startQuiz(level = state.level) {
    state.level = level;
    state.index = 0;
    state.correct = 0;
    state.answered = false;
    state.finished = false;
    state.rewardClaimed = false;

    levelCards.forEach(card => {
      const active = card.dataset.level === level;
      card.classList.toggle('is-selected', active);
      card.setAttribute('aria-pressed', String(active));
    });

    $('#quizLevelLabel').textContent = levelNames[level];
    $('#quizActive').hidden = false;
    $('#quizResult').hidden = true;
    $('#nextQuestion').textContent = 'Наступне →';

    renderQuestion();
  }

  // Обробники навчальних карток.
  conceptCards.forEach(card => {
    card.addEventListener('click', () => {
      updateConcept(card.dataset.concept);
    });
  });

  levelCards.forEach(card => {
    card.addEventListener('click', () => {
      startQuiz(card.dataset.level);
      $('#quiz').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Побудова моделі.
  $('#buildModel').addEventListener('click', () => buildModel(true));

  // Скидання параметрів розрахунку.
  $('#resetCalculation').addEventListener('click', () => {
    $('#objectType').value = 'keychain';
    $('#sizeInput').value = '30';
    detailInput.value = '1';
    $('#holeInput').checked = true;
    buildModel(false);
  });

  $('#resetModel').addEventListener('click', resetModel);

  // Автоматичне оновлення оцінки під час зміни параметрів.
  $('#objectType').addEventListener('change', () => buildModel(true));

  $('#sizeInput').addEventListener('input', () => {
    const value = Number($('#sizeInput').value);

    if (Number.isFinite(value) && value >= 10 && value <= 60) {
      buildModel(true);
    }
  });

  $('#sizeInput').addEventListener('change', () => buildModel(true));

  detailInput.addEventListener('input', () => buildModel(true));

  $('#holeInput').addEventListener('change', () => buildModel(true));

  $$('[data-detail]').forEach(button => {
    button.addEventListener('click', () => {
      detailInput.value = button.dataset.detail;
      buildModel(true);
    });
  });

  // Перехід між питаннями тесту.
  $('#nextQuestion').addEventListener('click', () => {
    if (!state.answered || state.finished) return;

    if (state.index >= questions[state.level].length - 1) {
      showResults();
    } else {
      state.index += 1;
      renderQuestion();
    }
  });

  $('#retryQuiz').addEventListener('click', () => {
    startQuiz(state.level);
  });

  // Нарахування зірочок.
  $('#claimReward').addEventListener('click', () => {
    if (!state.finished || state.rewardClaimed) return;

    state.rewardClaimed = true;
    state.stars += rewardByLevel[state.level];

    const balance = $('#starBalance');
    if (balance) balance.textContent = String(state.stars);

    $('#rewardNote').textContent =
      `Нараховано ${rewardByLevel[state.level]} зірочок! ` +
      `Усього зірочок: ${state.stars}.`;

    $('#claimReward').disabled = true;
  });

  // Відображення балансу зірочок.
  const footer = $('.footer-status');

  if (footer && !$('#starBalance')) {
    const balance = document.createElement('span');
    balance.id = 'starBalance';
    balance.className = 'star-balance';
    balance.textContent = '0';
    balance.setAttribute('aria-label', 'Зірочки');

    footer.append(document.createTextNode(' · ✦ '), balance);
  }

  // Початкове налаштування сторінки.
  setupMouseRotation();
  updateConcept('sketch');
  buildModel(false);
  applyRotation();
  startQuiz('easy');
  initThreeScene();
})();
