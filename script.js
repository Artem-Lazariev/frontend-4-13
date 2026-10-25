const delay = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
};

const loggerDelay = time => console.log(`Resolved after ${time}ms`);

delay(2000).then(loggerDelay);
delay(1000).then(loggerDelay);
delay(1500).then(loggerDelay);

const users = [
    { name: 'Mango', active: true },
    { name: 'Poly', active: false },
    { name: 'Ajax', active: true },
    { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
    return new Promise(resolve => {
        const updatedUsers = allUsers.map(user =>
            user.name === userName ? { ...user, active: !user.active } : user,
        );
        resolve(updatedUsers);
    });
};

const loggerUsers = updatedUsers => console.table(updatedUsers);

toggleUserState(users, 'Mango').then(loggerUsers);
toggleUserState(users, 'Lux').then(loggerUsers);

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
    const transactionDelay = randomIntegerFromInterval(200, 500);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;

            if (canProcess) {
                resolve({ id: transaction.id, time: transactionDelay });
            } else {
                reject(transaction.id);
            }
        }, transactionDelay);
    });
};

const logSuccess = ({ id, time }) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 })
    .then(logSuccess)
    .catch(logError);

makeTransaction({ id: 71, amount: 230 })
    .then(logSuccess)
    .catch(logError);

makeTransaction({ id: 72, amount: 75 })
    .then(logSuccess)
    .catch(logError);

makeTransaction({ id: 73, amount: 100 })
    .then(logSuccess)
    .catch(logError);

const btnTask1 = document.getElementById('run-task1');
const listTask1 = document.getElementById('list-task1');

btnTask1.addEventListener('click', () => {
    listTask1.innerHTML = '<li>Запуск затримок... Чекайте завершення всіх промісів.</li>';
    
    Promise.all([
        delay(1000),
        delay(2000),
        delay(1500)
    ]).then(times => {
        listTask1.innerHTML = '';
        times.forEach(time => {
            const li = document.createElement('li');
            li.textContent = `Проміс успішно виконано за ${time}ms`;
            listTask1.appendChild(li);
        });
    });
});

const btnTask2 = document.getElementById('run-task2');
const resultTask2 = document.getElementById('result-task2');

btnTask2.addEventListener('click', () => {
    resultTask2.textContent = 'Змагання почалося! Хто швидше?..';

    const p1 = delay(randomIntegerFromInterval(100, 1000)).then(() => 'Перший бігун (Mango)');
    const p2 = delay(randomIntegerFromInterval(100, 1000)).then(() => 'Другий бігун (Poly)');
    const p3 = delay(randomIntegerFromInterval(100, 1000)).then(() => 'Третій бігун (Ajax)');

    Promise.race([p1, p2, p3]).then(winner => {
        resultTask2.textContent = `🏆 Переможець змагання: ${winner}!`;
    });
});
