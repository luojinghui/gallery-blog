
/**
 * gally-blog
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-06-10 19:13:16
 */

import React, { useState, useEffect, useRef } from 'react'
import { imageData } from './data/index';
import { ImgFigure } from './componentes/ImgFigure'
import { ControllerUnit } from './componentes/ControllerUnit'

import './styles/App.css';

/**
 * 获取图片相关的数据
* 利用自执行函数,将图片信息转换成图片URL路径信息
 */
const imageDatas = (function genImageURL(imageDatasArr) {
  for (let i = 0; i < imageDatasArr.length; i++) {
    const singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('./images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageData);

//获取区间内的随机值
const getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);

//获取0~30°之间的一个任意正负值
const get30DegRandom = () => (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);

export const App = () => {
  const initState = createState();
  const cacheImgs = useRef(initState);
  const [imgsArrangeArr, setImgsArrangeArr] = useState(initState);
  const [centerIndex, setCenterIndex] = useState(0);
  const imgRef = useRef(null);
  const stateRef = useRef(null);

  const Constant = useRef({
    centerPos: { left: 0, right: 0 },
    //水平方向的取值范围
    hPosRange: { leftSecX: [0, 0], rightSecX: [0, 0], y: [0, 0] },
    //垂直方向的取值范围
    vPosRange: { x: [0, 0], topY: [0, 0] }
  });

  function createState() {
    const imgsRrr =  imageDatas.map(() => ({
      pos: { left: 0, top: 0 },
      rotate: 0,
      isInverse: false,
      isCenter: false
    }));

    return imgsRrr;
  }

  useEffect(() => {
    //首先拿到舞台的大小
    const stageW = stateRef.current.scrollWidth;
    const stageH = stateRef.current.scrollHeight;

    const halfStageW = Math.floor(stageW / 2);
    const halfStageH = Math.floor(stageH / 2);
    const imgW = imgRef.current.scrollWidth;
    const imgH = imgRef.current.scrollHeight;

    const halfImgW = Math.floor(imgW / 2);
    const halfImgH = Math.floor(imgH / 2);
    /**
     * 计算中心图片的位置点
     */
    Constant.current.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    //计算左侧右侧图片区域排布位置的取值范围
    Constant.current.hPosRange.leftSecX[0] = -halfImgW;
    Constant.current.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    Constant.current.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.current.hPosRange.rightSecX[1] = stageW - halfImgW;

    Constant.current.hPosRange.y[0] = -halfImgH;
    Constant.current.hPosRange.y[1] = stageH - halfImgH;

    //计算左侧右侧图片区域排布位置的取值范围
    Constant.current.vPosRange.topY[0] = -halfImgH;
    Constant.current.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    Constant.current.vPosRange.x[0] = halfImgW - imgW;
    Constant.current.vPosRange.x[1] = halfImgW;
  }, []);

  useEffect(() => {
    const cacheImgsArrangeArr = JSON.parse(JSON.stringify(cacheImgs.current));
    const centerPos = Constant.current.centerPos;
    const hPosRange = Constant.current.hPosRange;
    const vPosRange = Constant.current.vPosRange;
    const hPosRangeLeftSecX = hPosRange.leftSecX;
    const hPosRangeRightSecX = hPosRange.rightSecX;
    const hPosRangeY = hPosRange.y;
    const vPosRangeTopY = vPosRange.topY;
    const vPosRangeX = vPosRange.x;

    let imgsArrangeTopArr = [];
    let topImgNum = Math.floor(Math.random() * 2);
    let topImgSpliceIndex = 0;
    let imgsArrangeCenterArr = cacheImgsArrangeArr.splice(centerIndex, 1);

    //首先居中centerIndex的图片,居中的centerIndex的图片不需要旋转
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };

    //取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.floor(Math.random() * (cacheImgsArrangeArr.length - topImgNum));

    imgsArrangeTopArr = cacheImgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    //布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      };

      imgsArrangeTopArr[index].pos = {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
    });

    //布局左右两侧的图片
    for (let i = 0, j = cacheImgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      //前半部分布局左边,右半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      cacheImgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      cacheImgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    cacheImgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    setImgsArrangeArr(cacheImgsArrangeArr);  

  }, [centerIndex]);

  const center = (index) => {
    setCenterIndex(index);
  }

  const inverse = (index) => {
    const cacheImgsArrangeArr = JSON.parse(JSON.stringify(imgsArrangeArr));
    cacheImgsArrangeArr[index].isInverse = !cacheImgsArrangeArr[index].isInverse;

    setImgsArrangeArr(cacheImgsArrangeArr);
  }

  const renderImgFigures = () => {
    return imageDatas.map((value, index) => {
      return (<ImgFigure data={value} key={index} ref={index === 0 ? imgRef : null}
        arrange={imgsArrangeArr[index]}
        inverse={() => {
          inverse(index)
        }}
        center={() => {
          center(index)
        }} />)
    })
  }

  const renderNav = () => {
    return imageDatas.map((value, index) => (
      <ControllerUnit key={index} arrange={imgsArrangeArr[index]}
        inverse={() => {
          inverse(index)
        }}
        center={() => {
          center(index)
        }} />
    ))
  }

  return (
    <section className="stage" ref={stateRef}>
      <section className="img-sec">
        {renderImgFigures()}
      </section>
      <nav className="controller-nav">
        {renderNav()}
      </nav>
    </section>
  );
};

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.Constant = {
//       centerPos: {
//         left: 0,
//         right: 0
//       },
//       //水平方向的取值范围
//       hPosRange: {
//         leftSecX: [0, 0],
//         rightSecX: [0, 0],
//         y: [0, 0]
//       },
//       //垂直方向的取值范围
//       vPosRange: {
//         x: [0, 0],
//         topY: [0, 0]
//       }
//     };

//     this.state = {
//       imgsArrangeArr: this.createState()
//     };

//     // 获取statless component
//     this.imgf = React.createRef();
//   }

//   /**
//    * 翻转图片
//    * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
//    * @return {Function} 这是一个闭包函数,其内return一个真正待被执行的函数
//    */

//   inverse(index) {
//     const imgsArrangeArr = this.state.imgsArrangeArr;
//     imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

//     this.setState({
//       imgsArrangeArr
//     })
//   }

//   createState() {
//     return imageDatas.map(() => (
//       {
//         pos: {
//           left: 0,
//           top: 0
//         },
//         rotate: 0,
//         isInverse: false,
//         isCenter: false
//       }
//     ));
//   }

//   //组件加载以后,为每张图片计算其位置的范围
//   componentDidMount() {
//     //首先拿到舞台的大小
//     const stageW = this.stage.scrollWidth;
//     const stageH = this.stage.scrollHeight;

//     const halfStageW = Math.floor(stageW / 2);
//     const halfStageH = Math.floor(stageH / 2);
//     const imgFigureDOM = this.imgf.current;
//     const imgW = imgFigureDOM.scrollWidth;
//     const imgH = imgFigureDOM.scrollHeight;
//     const halfImgW = Math.floor(imgW / 2);
//     const halfImgH = Math.floor(imgH / 2);
//     /**
//      * 计算中心图片的位置点
//      */
//     this.Constant.centerPos = {
//       left: halfStageW - halfImgW,
//       top: halfStageH - halfImgH
//     };

//     //计算左侧右侧图片区域排布位置的取值范围
//     this.Constant.hPosRange.leftSecX[0] = -halfImgW;
//     this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

//     this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
//     this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

//     this.Constant.hPosRange.y[0] = -halfImgH;
//     this.Constant.hPosRange.y[1] = stageH - halfImgH;

//     //计算左侧右侧图片区域排布位置的取值范围
//     this.Constant.vPosRange.topY[0] = -halfImgH;
//     this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

//     this.Constant.vPosRange.x[0] = halfImgW - imgW;
//     this.Constant.vPosRange.x[1] = halfImgW;
//     let num = Math.floor(Math.random() * 10);
//     // this.rearrange(num);
//     this.rearrange(num);
//   }

//   /**
//    *重新布局所有图片
//    *@param: centerIndex 指定居中排布那个图片
//    */
//   rearrange(centerIndex) {
//     var imgsArrangeArr = this.state.imgsArrangeArr,
//       Constant = this.Constant,
//       centerPos = Constant.centerPos,
//       hPosRange = Constant.hPosRange,
//       vPosRange = Constant.vPosRange,
//       hPosRangeLeftSecX = hPosRange.leftSecX,
//       hPosRangeRightSecX = hPosRange.rightSecX,
//       hPosRangeY = hPosRange.y,
//       vPosRangeTopY = vPosRange.topY,
//       vPosRangeX = vPosRange.x,

//       imgsArrangeTopArr = [],
//       topImgNum = Math.floor(Math.random() * 2),
//       topImgSpliceIndex = 0,
//       imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

//     //首先居中centerIndex的图片,居中的centerIndex的图片不需要旋转
//     imgsArrangeCenterArr[0] = {
//       pos: centerPos,
//       rotate: 0,
//       isCenter: true
//     };

//     //取出要布局上侧的图片的状态信息
//     topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));

//     imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
//     //布局位于上侧的图片
//     imgsArrangeTopArr.forEach(function (value, index) {
//       imgsArrangeTopArr[index] = {
//         pos: {
//           top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
//           left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
//         },
//         rotate: get30DegRandom(),
//         isCenter: false
//       };

//       imgsArrangeTopArr[index].pos = {
//         top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
//         left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
//       }
//     });

//     //布局左右两侧的图片
//     for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
//       let hPosRangeLORX = null;
//       //前半部分布局左边,右半部分布局右边
//       if (i < k) {
//         hPosRangeLORX = hPosRangeLeftSecX;
//       } else {
//         hPosRangeLORX = hPosRangeRightSecX;
//       }

//       imgsArrangeArr[i] = {
//         pos: {
//           top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
//           left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
//         },
//         rotate: get30DegRandom(),
//         isCenter: false
//       }
//     }
//     if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
//       imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
//     }
//     imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

//     this.setState({
//       imgsArrangeArr: imgsArrangeArr
//     });
//   }

//   /**
//    * 利用 rearrange函数, 居中对应index的图片
//    * @param index,需要被居中的图片对应的图片信息数组的index值
//    * @return {function}
//    */

//   center(index) {
//     this.rearrange(index);
//   }

//   renderImgFigures() {
//     return imageDatas.map((value, index) => (
//       <ImgFigure data={value} key={index} ref={index === 0 ? this.imgf : ''}
//         arrange={this.state.imgsArrangeArr[index]}
//         inverse={() => {
//           this.inverse(index)
//         }}
//         center={() => {
//           this.center(index)
//         }} />
//     ))
//   }

//   renderNav() {
//     return imageDatas.map((value, index) => (
//       <ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
//         inverse={() => {
//           this.inverse(index)
//         }}
//         center={() => {
//           this.center(index)
//         }} />
//     ))
//   }

//   render() {
//     return (
//       <section className="stage" ref={stage => this.stage = stage}>
//         <section className="img-sec">
//           {
//             this.renderImgFigures()
//           }
//         </section>
//         <nav className="controller-nav">
//           {
//             this.renderNav()
//           }
//         </nav>
//       </section>
//     );
//   }
// }
