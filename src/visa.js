export class ApplyForVisa {
    fetch(timeout = 2000) {
        const successfulRequest = {
            data: 'Виза получена',
        };

        const failureRequest = {
            error: new Error('В визе отказано')
        };

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0
                    ? resolve(successfulRequest)
                    : reject(failureRequest);
            }, timeout);
        });
    }
}