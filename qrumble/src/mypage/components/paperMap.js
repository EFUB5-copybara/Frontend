import background1Img from '../../home/assets/svgs/background1.svg';
import background2Img from '../../home/assets/svgs/background2.svg';
import background3Img from '../../home/assets/svgs/background3.svg';
import background4Img from '../../home/assets/svgs/background4.svg';
import background1exImg from '../assets/background1ex.svg';
import background2exImg from '../assets/background2ex.svg';
import background3exImg from '../assets/background3ex.svg';
import background4exImg from '../assets/background4ex.svg';

export const paperImageMap = {
  '-1': null, // 기본 종이(없음)
  1: background1Img,
  2: background2Img,
  3: background3Img,
  4: background4Img,
};

export const getPaperImage = (paperId) =>
  paperImageMap[String(paperId)] ?? null;

export const paperImageExMap = {
  '-1': null, // 기본 종이(없음)
  1: background1exImg,
  2: background2exImg,
  3: background3exImg,
  4: background4exImg,
};
