/**
 * ImgFigure
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-06-10 21:22:04
 */

import React, { forwardRef } from 'react'
// import React, { Component } from 'react'

export const ImgFigure = forwardRef((props, ref) => {
  let styleObj = {};

  //如果props属性中制定了这张图片的位置,则使用
  if (props.arrange.pos) {
    styleObj = JSON.parse(JSON.stringify(props.arrange.pos));
  }

  //如果图片的旋转角度有值并且不为0,添加旋转角度
  if (props.arrange.rotate) {
    (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => {
      styleObj[value] = 'rotate(' + props.arrange.rotate + 'deg)';
    })
  }

  if (props.arrange.isCenter) {
    styleObj['zIndex'] = 11;
  }

  let imgFigureClassName = 'img-figure';
  imgFigureClassName += props.arrange.isInverse ? ' is-inverse' : '';

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();

    if (props.arrange.isCenter) {
      props.inverse();
    } else {
      props.center();
    }
  }

  return (
    <figure ref={ref} className={imgFigureClassName} style={styleObj} onClick={handleClick}>
      <img src={props.data.imageURL}
        alt={props.data.title} />
      <figcaption>
        <h2 className="img-title">{props.data.title}</h2>
        <div className="img-back" onClick={handleClick}>
          <p>
            {props.data.desc}
          </p>
        </div>
      </figcaption>
    </figure>
  );
});

// export default class ImgFigure extends Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   /**
//    * imgFigure的点击处理函数
//    */

//   handleClick(e) {
//     e.stopPropagation();
//     e.preventDefault();

//     if (this.props.arrange.isCenter) {
//       this.props.inverse();
//     } else {
//       this.props.center();
//     }
//   }

//   render() {
//     let styleObj = {};

//     //如果props属性中制定了这张图片的位置,则使用
//     if (this.props.arrange.pos) {
//       styleObj = JSON.parse(JSON.stringify(this.props.arrange.pos));
//     }


//     //如果图片的旋转角度有值并且不为0,添加旋转角度
//     if (this.props.arrange.rotate) {
//       (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => {
//         styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
//       })
//     }

//     if (this.props.arrange.isCenter) {
//       styleObj['zIndex'] = 11;
//     }

//     let imgFigureClassName = 'img-figure';
//     imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

//     return (
//       <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
//         <img src={this.props.data.imageURL}
//           alt={this.props.data.title} />
//         <figcaption>
//           <h2 className="img-title">{this.props.data.title}</h2>
//           <div className="img-back" onClick={this.handleClick}>
//             <p>
//               {this.props.data.desc}
//             </p>
//           </div>
//         </figcaption>
//       </figure>
//     );
//   }
// }
