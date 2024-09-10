const CountTime = ({ date1, date2 }) => {
  const countDate1 = new Date(date1); // YYYY-MM-DDTHH:MM:SS format
  const countDate2 = new Date(date2);

  const timeDifferenceMs = countDate2 - countDate1;

  const millisecondsInAMinute = 60 * 1000; // 60 seconds * 1000 milliseconds
  const minutesDifference = timeDifferenceMs / millisecondsInAMinute;
  console.log(new Date());

  if (minutesDifference < 60) {
    return <p>{Math.round(minutesDifference)} mins ago</p>;
  } else {
    const hoursDifference = minutesDifference / 60;
    return <p>{Math.round(hoursDifference)} hours ago</p>;
  }
};

export default CountTime;
