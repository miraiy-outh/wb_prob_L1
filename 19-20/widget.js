const widgets = document.querySelector('.widgets');
let isFirtTimeLoad = true; // Переменная, показывающая, что пользователь запустил виджет после обновления страницы.
const maxSizeLocalStorage = 5; // Максимальный размер localStorage В МБ (На самом деле максимальный размер 5.27 МБ).


/**
* Функция вывода объема занимаемой памяти.
*/
function writeLocalDataInfo() {
    let tmpSize = 0;
    if (localStorage.postsData != undefined) {
        tmpSize = Math.ceil(JSON.stringify(localStorage).length / (1024 * 1024) * 100) / 100;
    }

    console.log(`Всего занято ${tmpSize} МБ данных из ${maxSizeLocalStorage} МБ возможных.`)
}

/**
* Обработка запроса на созданный сервер.
*
* @param {number} offset - Значение сдвига среза данных.
*/
function getData(offset) {
    fetch(`http://127.0.0.1:3000/getPosts?offset=${offset}`) // Запрос к созданному серверу.
        .then(response => {
            return response.json(); // Получаем ответ.
        })
        .then(data => {
            // Получаем нужный срез данных.
            const arrayPosts = data.response.items;
            let newArrayPosts = arrayPosts.map((arrayPost) => {
                const { attachments, text } = arrayPost;
                return { attachments, text };
            });

            let arrayPostsLocal = []; // Получаем данные из localStorage.
            if (isFirtTimeLoad) {
                isFirtTimeLoad = false;

                // Если localStorage пустой, заполняем его данными, полученными от 1 запроса.
                if (localStorage.postsData === undefined) {
                    localStorage.setItem('postsData', JSON.stringify(newArrayPosts));
                }

                arrayPostsLocal = (JSON.parse(localStorage.postsData));
            }
            else {
                // Если объем занятой памяти localStorage больше критического (в МБ), то удаляем первые 10 записей.
                if (JSON.stringify(localStorage).length / (1024 * 1024) >= maxSizeLocalStorage) {
                    localStorage.setItem('postsData', JSON.stringify((JSON.parse(localStorage.postsData)).slice(10)))
                }

                addToLocalStorage(newArrayPosts); // Если запрос выполняется не в 1 раз (пользователь проскроллил страницу), то добавляем в массив localStorage новые данные.
                arrayPostsLocal = (JSON.parse(localStorage.postsData)).slice(-10);
            }

            isOffset = true; // Пользователь пока не прокрутил до конца виджета.
            writeLocalDataInfo();
            createPosts(arrayPostsLocal); // Отрисовываем данные в HTML.
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}

/**
* Добавление новых данных о постах в localStorage.
*
* @param {Array} arrayPostsLocal - Массив с данными о постах.
*/
function addToLocalStorage(array1) {
    const oldArrayPosts = JSON.parse(localStorage.getItem('postsData'));
    if (oldArrayPosts != null) {
        let array2 = oldArrayPosts.concat(array1);
        localStorage.setItem('postsData', JSON.stringify(array2));
    }
    else {
        localStorage.setItem('postsData', JSON.stringify(array1));
    }
}

/**
* Создание постов в HTML.
*
* @param {Array} arrayPostsLocal - Массив с данными о постах.
*/
function createPosts(arrayPostsLocal) {
    arrayPostsLocal.forEach((arrayPostLocal) => {
        createPost(arrayPostLocal.attachments, arrayPostLocal.text);
    });
}

/**
* Создание поста в HTML.
*
* @param {Array} attachements - Массив с данными о постах (нужны данные о типе прикрепленного файла + url файла).
* @param {string} text - Текст поста.
*/
function createPost(attachements, text) {
    const post = document.createElement('div');
    post.classList.add('post');
    if (text != '') {
        const postText = document.createElement('p');
        postText.classList.add('text');
        postText.textContent = text;
        post.appendChild(postText);
    }
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img__container');
    for (let i = 0; i < attachements.length; i++) {
        if (attachements[i].type === 'photo') {
            let tmpImageURL = attachements[i].photo.sizes[1].url;
            const imgURL = document.createElement('img');
            imgURL.src = tmpImageURL;
            imgContainer.appendChild(imgURL);
            post.appendChild(imgContainer);
        }
        if (attachements[i].type === 'video') {
            const tmpVideoURL = `https://vk.com/video${attachements[i].video.owner_id}_${attachements[i].video.id}`;
            const videoURL = document.createElement('iframe');
            videoURL.src = tmpVideoURL;
            imgContainer.appendChild(videoURL);
            post.appendChild(imgContainer);
        }
    }
    widgets.appendChild(post);
}

const widgetsContainer = document.querySelector('.widgets__container');

widgetsContainer.addEventListener('scroll', () => {
    // Проверяем, достиг ли скролл конца виджета.
    if (widgetsContainer.scrollTop >= widgetsContainer.scrollHeight - widgetsContainer.clientHeight - 20 && isOffset) {
        offset += 10; // Сдвиг загрузки постов на следующие 10.
        localStorage.setItem('offset', offset); // Меняем значение offset в localStorage.
        isOffset = false; // Обнуляем скролл.
        getData(offset);
    }
});

let offset = 0;
let isOffset = false; // Переменная, показывающая, проскроллил ли пользователь до конца виджета.
let tmpOffset = Number(JSON.parse(localStorage.getItem('offset'))); // Берем offset из localStorage.

if (tmpOffset > 0) {
    offset = tmpOffset;
}

getData(offset); // Выполнение запроса на получение данных.
