export default class DateUtils {
    constructor(date){
        this.date = date;
    }

    getDays(){
        // date1 = new Date(),
        //     date2 = new Date();
        // date2.setMonth(date1.getMonth()+1);
        // console.log((date2.getTime()-date1.getTime())/(24*60*60*1000))
        const
            date = this.date,
            month = date.getMonth()+1,
            year = date.getFullYear(),
            isLeapYear = year%4 === 0 && year%100!==0,
            bigMonth = [1,3,5,7,8,10,12];

        if(month === 2) {
            return isLeapYear ? 29 : 28;
        } else{
            return (~bigMonth.indexOf(month))&&31 || 30;
        }
    }

    lastMonth(){
        //setMonth(-1)会自动取到上一年
        this.date.setMonth(this.date.getMonth()-1);
        return this;
    }

    nextMonth(){
        //setMonth(13)会自动取到下一年
        this.date.setMonth(this.date.getMonth()+1);
        return this;
    }

    chineseDate(){
        let date = this.date;
        return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
    }

    format(split = '-'){
        let date = this.date;
        return `${date.getFullYear()}${split}${String(date.getMonth()+1).padStart(2,0)}${split}${String(date.getDate()).padStart(2,0)}`;
    }

    equal(date){
        // [\d:]+ GMT
        const thisDate = this.date;
        return thisDate.toUTCString().replace(/ [\d:]+ GMT/,"") === date.toUTCString().replace(/ [\d:]+ GMT/,"");
    }

    static formatTime(seconds) {
        return [
            parseInt(seconds / 60 / 60),
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
        ]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
    }
}