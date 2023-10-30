import {css} from '@emotion/css';
export const container_class = css`
  width: 80%;
  height: 96%;
  display: flex;

  > :last-child {
    border: 0 solid rgb(0, 0, 0, 0.1);
    flex-shrink: 0;
  }

  @media (min-width: 800px) {
    flex-direction: row-reverse;
    float:left;

    > :last-child {
      border-right-width: 1px;
      width: 260px;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;

    > :last-child {
      border-top-width: 1px;
      width: 100%;
      height: 150px;
    }
  }
`;

export const mainLineClass = css`
  stroke-width:2px!important;
  stroke-dasharray: 0px 6px!important;
  stroke:#9CB3CA!important;
`;