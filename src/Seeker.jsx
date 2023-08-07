import { useState } from "react"

export default function Seeker({onValueChange , min , max, value}){

    const [onHover, setOnHover] = useState(false);
    const progressRatio = isNaN(max) ? "0%" : `${value / max * 100}%`;

    const mouseEnterHandle = () => {
      setOnHover(true);
    };

    const mouseLeaveHandle = () => {
      setOnHover(false);
    };

    const valueChangeHandle = (e) => {
      onValueChange(e.target.value);
    };

    if(onHover){
        return <input
              type="range"
              value={value}
              min={min}
              max={max}
              className="seeking seeking--slider"
              onMouseLeave={mouseLeaveHandle}
              onChange={valueChangeHandle}
            />
    }else{
        return <div  onMouseEnter={mouseEnterHandle} className="seeking seeking--duration">
                <div className="seeking seeking--current"
                style={{width: progressRatio}}
              ></div>
            </div>
        
    }
}