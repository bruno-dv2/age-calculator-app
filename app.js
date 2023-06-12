//interação
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const button = document.getElementById('button');

// exibição
const resultYears = document.getElementById('result-years');
const resultMonths = document.getElementById('result-months');
const resultDays = document.getElementById('result-days');

campos = document.querySelectorAll('.inputs');
erro = document.querySelectorAll('.span');
label = document.querySelectorAll('.label');

// faz o calculo da sua exata idade, precisei de ajuda para montar está função pois não sabia o algoritimo para escreve-la;
function calculateAge(birthDate) {
  const currentDate = new Date();

  let age = {};
  let ageInMilliseconds = currentDate - birthDate;

  age.years = Math.floor(ageInMilliseconds / 31557600000);
  ageInMilliseconds = ageInMilliseconds % 31557600000;

  age.months = Math.floor(ageInMilliseconds / 2592000000);
  ageInMilliseconds = ageInMilliseconds % 2592000000;

  age.days = Math.floor(ageInMilliseconds / 86400000);
  ageInMilliseconds = ageInMilliseconds % 86400000;

  age.hours = Math.floor(ageInMilliseconds / 3600000);

  resultYears.innerHTML = `${wrapInSpan(age.years)} years`;
  resultMonths.innerHTML = `${wrapInSpan(age.months)} months`;
  resultDays.innerHTML = `${wrapInSpan(age.days)} days`;

  function wrapInSpan(value) {
    return `<span style="color: hsl(259, 100%, 65%);">${value}</span>`;
  }
  return age;
}

// botão para escutar o clique e executar todas as funções
button.addEventListener('click', () => {
  validateCampo(inputDay.value, inputMonth.value, inputYear.value);
});

// função para validar o dia
function validateCampoDay(day) {
  if (day < 1 || day > 31) {
    campos[0].style.border = '1px solid red';
    erro[0].textContent = 'Must be a valid day';
    label[0].style.color = 'red';
  } else {
    campos[0].style.border = '';
    erro[0].textContent = '';
    label[0].style.color = 'hsl(0, 1%, 44%)';
  }
}

// função para validar o mês
function validateCampoMonth(month) {
  if (month < 1 || month > 12) {
    campos[1].style.border = '1px solid red';
    erro[1].textContent = 'Must be a valid month';
    label[1].style.color = 'red';
  } else {
    campos[1].style.border = '';
    erro[1].textContent = '';
    label[1].style.color = 'hsl(0, 1%, 44%)';
  }
}

//função para validar os anos
function validateCampoYear(inputYear) {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  if (inputYear > currentYear) {
    campos[2].style.border = '1px solid red';
    erro[2].textContent = 'Must be in the past';
    label[2].style.color = 'red';
  } else {
    campos[2].style.border = '';
    erro[2].textContent = '';
    label[2].style.color = 'hsl(0, 1%, 44%)';
  }
}

// função para verificar se o dia existe no mês e ano inseridos, foi utilizado o objeto Date para fazer a validação.
function daysInMonth(month, year, inputDay) {
  let daysInMonth = new Date(year, month, 0).getDate();
  if (inputDay > daysInMonth) {
    campos[0].style.border = '1px solid red';
    erro[0].textContent = 'Must be a valid day';
    label[0].style.color = 'red';
  }
}

//função para validar se os inputs estão preenchidos e corretos, se os estiverem corretos logo em seguida executa a função para calcular a idade.
function validateCampo(day, month, year) {
  let hasError = false;
  if (day === '') {
    erro[0].textContent = 'This field is required';
    campos[0].style.border = '1px solid red';
    label[0].style.color = 'red';
    hasError = true;
  } else {
    validateCampoDay(inputDay.value);
    if (erro[0].textContent !== '') {
      hasError = true;
    }
  }
  if (month === '') {
    erro[1].textContent = 'This field is required';
    campos[1].style.border = '1px solid red';
    label[1].style.color = 'red';
    hasError = true;
  } else {
    validateCampoMonth(inputMonth.value);
    if (erro[1].textContent !== '') {
      hasError = true;
    }
  }
  if (year === '') {
    erro[2].textContent = 'This field is required';
    campos[2].style.border = '1px solid red';
    label[2].style.color = 'red';
    hasError = true;
  } else {
    validateCampoYear(inputYear.value);
    if (erro[2].textContent !== '') {
      hasError = true;
    }
  }

  // cria um objeto com o nome birthDate com a data inserida pelo usuario, a função só executa se a variavel !hasErro for TRUE.
  if (!hasError) {
    const birthDate = new Date(inputYear.value, inputMonth.value - 1, inputDay.value);
    calculateAge(birthDate);
  }
}
