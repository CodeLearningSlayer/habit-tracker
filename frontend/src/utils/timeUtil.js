export function getDateAndDay(){
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
      };
    
      const date = new Date(Date.now()).toLocaleString("ru", dateOptions);
      const days = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
      ];
      let day = new Date(Date.now()).getDay();
      day = day > 0 ? days[day - 1] : days[6];
      return {
        day,
        date
      }
}

export function getTimeOfDay(){
    let MyDate = new Date(),
    MyHours = MyDate.getHours();
    switch (true){
      case (MyHours >= 5) && (MyHours < 11):
        return('Good morning, ');
      case (MyHours >= 11) && (MyHours < 16):
        return('Good afternoon, ');
      case (MyHours >= 16) && (MyHours <= 23):
        return ('Good evening, ');
      case (MyHours >= 0) && (MyHours < 5):
        return ('Good night, ');
      default:
        return true
    }
  }