export default function formatMoney(number) {
  // Преобразуем число в строку
  const str = number.toString();

  // Добавляем пробелы каждые 3 цифры
  const regex = /(\d)(?=(\d{3})+(?!\d))/g;
  return str.replace(regex, '$1 ');
}