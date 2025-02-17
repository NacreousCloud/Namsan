import * as S from './SearchBar.style';
import React, { useCallback, useEffect, useState } from 'react';
import SelectBox from '../SelectBox';
import useSearchBar from './SearchBar.hook';
import {
  getMemberBusinessFieldList,
  getMemberPositionList,
} from '@Api/member.api';
import Input from '../../common/Input';
import { useIntl } from 'gatsby-plugin-intl';
import { getSearchParams } from '../MembersWrapper/MembersWarpper.helper';

const SearchBar = () => {
  const {
    name: initName,
    position: initPosition,
    businessField: initBusinessField,
  } = getSearchParams();

  const intl = useIntl();
  const INIT_POSITION_OPTION = intl.formatMessage({
    id: 'members.total_position',
  });
  const INIT_BUSINESS_FIELD_OPTION = intl.formatMessage({
    id: 'members.total_business_field',
  });

  // State
  const [name, setName] = useState<string>(initName || '');

  // Hooks
  const {
    optionList: positionOptionList,
    currentOption: currentPosition,
    isOpen: isPositionSelectOpen,
    setIsOpen: setIsPositionSelectOpen,
    handleClickOption: handleClickPositionOption,
    handleClickSelectBox: handleClickPositionSelectBox,
  } = useSearchBar({
    defaultOption: INIT_POSITION_OPTION,
    initOption: initPosition,
    getOptionList: getMemberPositionList,
  });

  const {
    optionList: businessFieldOptionList,
    currentOption: currentBusinessField,
    isOpen: isBusinessFieldSelectOpen,
    setIsOpen: setIsBusinessFieldSelectOpen,
    handleClickOption: handleClickBusinessFieldOption,
    handleClickSelectBox: handleClickBusinessFieldSelectBox,
  } = useSearchBar({
    defaultOption: INIT_BUSINESS_FIELD_OPTION,
    initOption: initBusinessField,
    getOptionList: getMemberBusinessFieldList,
  });

  // Handlers
  const _handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const position =
      currentPosition === INIT_POSITION_OPTION ? '' : currentPosition;
    const businessField =
      currentBusinessField === INIT_BUSINESS_FIELD_OPTION
        ? ''
        : currentBusinessField;
    window.location.href = `/members?position=${position}&businessField=${businessField}&name=${name}`;
  };

  const _handleBlur = useCallback(() => {
    setIsPositionSelectOpen(false);
    setIsBusinessFieldSelectOpen(false);
  }, []);

  const _handleClickPositionSelectBox = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    handleClickPositionSelectBox(event);
    setIsBusinessFieldSelectOpen(false);
  };

  const _handleClickBusinessFieldSelectBox = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    handleClickBusinessFieldSelectBox(event);
    setIsPositionSelectOpen(false);
  };

  const _handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('click', _handleBlur);
    return () => {
      window.removeEventListener('click', _handleBlur);
    };
  }, []);

  return (
    <div>
      <S.SearchBarWrapper>
        <S.ItemWrapper
          width="282px"
          data-id="position"
          onClick={_handleClickPositionSelectBox}
        >
          <SelectBox
            key="position"
            title={currentPosition}
            options={positionOptionList}
            handleClick={handleClickPositionOption}
            currentOption={currentPosition}
            isOpen={isPositionSelectOpen}
            setOpen={setIsPositionSelectOpen}
          />
        </S.ItemWrapper>
        <S.ItemWrapper
          width="384px"
          data-id="businessField"
          onClick={_handleClickBusinessFieldSelectBox}
        >
          <SelectBox
            key="businessField"
            title={currentBusinessField}
            options={businessFieldOptionList}
            handleClick={handleClickBusinessFieldOption}
            currentOption={currentBusinessField}
            isOpen={isBusinessFieldSelectOpen}
            setOpen={setIsBusinessFieldSelectOpen}
          />
        </S.ItemWrapper>
        <S.ItemWrapper width="486px">
          <Input
            handleSubmit={_handleSubmit}
            placeholder={intl.formatMessage({
              id: 'members.search_placeholder',
            })}
            value={name}
            handleChange={_handleNameChange}
          />
        </S.ItemWrapper>
      </S.SearchBarWrapper>
    </div>
  );
};

export default SearchBar;
