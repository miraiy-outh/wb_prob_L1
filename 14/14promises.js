function load(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve({
                width: image.width,
                height: image.height,
                url: url
            });
        };
        image.onerror = () => {
            reject(`Failed to load image at URL: ${url}`);
        };
        image.src = url;
    });
}

const imageUrl = 'https://rabotatam.ru/uploads/monthly_2017_04/large.58f1bdeda1c5c_.jpg.91c33c120ad86a4dbf2c50dd44d00890.jpg';
load(imageUrl)
    .then(data => {
        console.log(`Image loaded: ${data.url}`);
        console.log(`Image size: ${data.width}x${data.height}`);
    })
    .catch(error => {
        console.error(error);
    });