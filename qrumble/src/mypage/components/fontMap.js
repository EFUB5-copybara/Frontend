import font1Img from '../assets/fontComo.svg';
import font2Img from '../assets/fontMM.svg';
import font3Img from '../assets/fontTheSeasons.svg';
import font4Img from '../assets/fontTangier.svg';
import font1exImg from '../assets/fontComoex.svg';
import font2exImg from '../assets/fontMMex.svg';
import font3exImg from '../assets/fontTheSeasonsex.svg';
import font4exImg from '../assets/fontTangierex.svg';
import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

export const fontImageMap = {
  '-1': null, // 기본 폰트
  1: font1Img,
  2: font2Img,
  3: font3Img,
  4: font4Img,
};

export const fontImageExMap = {
  '-1': null, // 기본 폰트
  1: font1exImg,
  2: font2exImg,
  3: font3exImg,
  4: font4exImg,
};

export const fontStyleMap = {
  [-1]: () => css`
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans KR',
      Arial, sans-serif;
  `,
  1: ({ theme }) => theme.fonts.como,
  2: ({ theme }) => theme.fonts.museoModerno,
  3: ({ theme }) => theme.fonts['the-seasons'],
  4: ({ theme }) => theme.fonts.tangier,
};
