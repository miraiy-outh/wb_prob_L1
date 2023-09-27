const apiKey = 'ca30d3e5-53a6-4c19-8e59-226111d3db03';

/**
* Функция, осуществляющая дебоунсинг и предотвращающая троттлинг.
* 
* @param {Function} func - Переданная функция.
* @param {number} delay - Задержка.
* @return {Function}
*/
function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        // Указываем задержку.
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

const geocodeAddress = debounce(async (address) => {
    // Отправка запроса с ключом и введенным в строку адресом.
    await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${address}&format=json`)
        .then(response => {
            // Обработка успешного ответа.
            if (!response.ok) {
                throw new Error('Ошибка HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Получение массива найденных адресов.
            const featureMembers = data.response.GeoObjectCollection.featureMember;
            // Запуск функции обновления адресов в списке.
            updateAddressList(featureMembers);
        })
        .catch(error => {
            // Обработка ошибки.
            console.error('Произошла ошибка:', error);
        });

    /**
    * Функция, осуществляющая дебоунсинг и предотвращающая троттлинг.
    * 
    * @param {GeoObject[]} featureMembers - Массив объектов с адресами.
    */
    function updateAddressList(featureMembers) {
        const addressSelect = document.getElementById('addressSelect');
        addressSelect.innerHTML = '';
        // Добавляем слушателя к полю select.
        addressSelect.addEventListener("click", function () {
            addressInput.value = addressSelect.value; // при выборе значения select меняется значение в input.
        });

        // Проходим по массиву объектов и добавляем отформатированные адреса в select.
        featureMembers.forEach((featureMember) => {
            const addressResult = featureMember.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted; // Берем отформатированный адрес.
            const selectElement = document.createElement('option');
            selectElement.textContent = addressResult;
            selectElement.value = addressResult;
            addressSelect.appendChild(selectElement);
        });
    }
}, 300);

// Поле input.
const addressInput = document.getElementById('addressInput');
// Добавляем слушателя к полю input.
addressInput.addEventListener('input', (e) => {
    const inputText = e.target.value;
    // Если поле input не пустое, вызываем функци поиска адресов.
    if (inputText.trim() !== '') {
        geocodeAddress(inputText);
    } else {
        updateAddressList([]);
    }
});

// Button.
const addressButton = document.getElementById('addressButton');
// Добавляем слушателя к button.
addressButton.addEventListener('click', () => {
    const inputText = addressInput.value;
    console.log(inputText)
    // Если поле input не пустое, ищем адрес в поиске яндекса.
    if (inputText.trim() !== '') {
        window.location.href = `https://yandex.ru/search/?text=${inputText}`; // Устанавливаем новую ссылку.
    }
});