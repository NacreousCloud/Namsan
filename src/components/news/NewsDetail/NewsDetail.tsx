import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon';
import { News } from '@Interface/api.interface';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import * as S from './NewsDetail.style';
import { useLocation } from '@reach/router';
import { getNewsData } from '@Api/news.api';
import { injectIntl, WrappedComponentProps } from 'gatsby-plugin-intl';

interface DetailNewsState extends Omit<News, 'date'> {}
const init: DetailNewsState = {
  agency: '',
  newsType: 'media',
  originalLink: '',
  title: '',
  content: '',
  dateYearMonthDate: '',
};

interface Props extends WrappedComponentProps {}

const NewsDetail = (props: Props) => {
  const { pathname } = useLocation();
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [detail, setDetail] = useState<DetailNewsState>(init);
  const { agency, newsType, originalLink, title, content, dateYearMonthDate } =
    detail;

  useEffect(() => {
    onGetNewData();
  }, []);

  const onGetNewData = () => {
    getNewsData(id)
      .then(setDetail)
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const onClickOiriginal = () => {
    window.open(originalLink ?? '', '_blank');
  };
  const handleClickList = () => {
    navigate(`/${props.intl.locale}/news`);
  };
  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const isMediaNews = newsType === 'media';
  const topTxt = isMediaNews ? agency : '최근 업무사례';

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <S.TopText newsType={newsType}>{topTxt}</S.TopText>
        <S.TitleArea>
          <LineArrowIcon
            direction="LEFT"
            weight="LIGHT"
            width="60px"
            height="60px"
          />
          <h1>{title}</h1>
          <LineArrowIcon
            direction="RIGHT"
            weight="LIGHT"
            width="60px"
            height="60px"
          />
        </S.TitleArea>
        <S.HeaderDivder />
        <S.DateARea>{dateYearMonthDate}</S.DateARea>
      </S.HeaderContainer>
      <S.ContentConatiner>
        {/* 사진 */}
        <article className="top">
          {isMediaNews && <img src="" alt="" />}
        </article>
        <S.Content>{content}</S.Content>
        <article className="bottom">
          {/* 프로필 정보 */}
          {!isMediaNews && <img src="" alt="" />}
          <BaseButton className={'support'} onClick={onClickOiriginal}>
            기사 원문보기
          </BaseButton>
        </article>
      </S.ContentConatiner>
      <S.BottomConatiner>
        <div className="action__area">
          <div className="prev">
            <button datatype="prev" onClick={handleMove}>
              <LineArrowIcon direction={'LEFT'} weight="NORMAL" />
              <p>이전글</p>
            </button>
            <p>양원석 남산 경영담당 변호사, 대표변호사로 취임</p>
          </div>
          <S.ListIconWrapper>
            <BaseButton className="hamburger-news" onClick={handleClickList} />
          </S.ListIconWrapper>
          <div className="next">
            <p>양원석 남산 경영담당 변호사, 대표변호사로 취임</p>
            <button datatype="next" onClick={handleMove}>
              <p>다음글</p>
              <LineArrowIcon direction={'RIGHT'} weight="NORMAL" />
            </button>
          </div>
        </div>
      </S.BottomConatiner>
    </S.Wrapper>
  );
};

export default injectIntl(NewsDetail);
