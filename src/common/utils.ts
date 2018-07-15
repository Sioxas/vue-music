import { Singer } from '@/common/interface';

export function getSingerStr(val:Singer[]|string):string{
    if (typeof val === 'string') {
      return val;
    } else if (typeof val === 'object') {
      return val.map((item)=>item.name).join(' ');
    }else{
        return val;
    }
}

export function parseColor(encodeedColor?:number):{
    color:string,
    gradientcolor:string,
    isDark:boolean,
    background:(opacity:number)=>string,
}{
    let color:string;
    if(encodeedColor){
        const fixed = '00000' + encodeedColor.toString(16);
        color = '#' + fixed.substr(fixed.length - 6);
    }else{
        color = '#ffffff';
    }
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const gradientcolor = `-webkit-linear-gradient(top, rgba(${r},${g},${b}, 0), ${color})`;
    const grayLevel = r * 0.299 + g * 0.587 + b * 0.114;
    const isDark = grayLevel < 192;

    function background(opacity:number){
        return `rgba(${r}, ${g}, ${b} ,${opacity})`;
    }
    return {color,gradientcolor,isDark,background};
}
