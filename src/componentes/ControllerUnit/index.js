/**
 * Description
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-06-11 16:22:23
 */

import React, { forwardRef } from 'react'

export const ControllerUnit = forwardRef((props, ref) => {
    let controllerUnitClassName = 'controller-unit';

    //如果对应的居中的图片,显示控制按钮的剧中态
    if (props.arrange.isCenter) {
      controllerUnitClassName += ' is-center';

      //如果对应的是翻转图片,显示控制状态的翻转状态
      if (props.arrange.isInverse) {
        controllerUnitClassName += ' is-inverse';
      }
    }

    function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();

      //如果点击的是当前正在选中的按钮,则翻转图片,否则将对应的图片居中
      if (props.arrange.isCenter) {
        props.inverse();
      } else {
        props.center();
      }
    }

    return (
      <span ref={ref} className={controllerUnitClassName} onClick={handleClick}></span>
    );
})


// export default class ControllerUnit extends Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(e) {
//     //如果点击的是当前正在选中的按钮,则翻转图片,否则将对应的图片居中
//     if (this.props.arrange.isCenter) {
//       this.props.inverse();
//     } else {
//       this.props.center();
//     }

//     // e.preventDefault();
//     // e.stopPropagation();
//   }

//   render() {
//     var controllerUnitClassName = 'controller-unit';

//     //如果对应的居中的图片,显示控制按钮的剧中态
//     if (this.props.arrange.isCenter) {
//       controllerUnitClassName += ' is-center';

//       //如果对应的是翻转图片,显示控制状态的翻转状态
//       if (this.props.arrange.isInverse) {
//         controllerUnitClassName += ' is-inverse';
//       }
//     }

//     return (
//       <span className={controllerUnitClassName} onClick={this.handleClick}></span>
//     );
//   }
// }
