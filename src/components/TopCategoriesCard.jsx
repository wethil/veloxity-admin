import React from 'react';
import { useTranslation } from 'react-i18next';
import { currency, numberFormat } from '../utilities/stringUtils';


import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap';


const getSubInfos = (infoObject, t) => Object.keys(infoObject)
  .filter(key => !['id'].includes(key))
  .map(key => {
    let value = '';
    if (isNaN(infoObject[key])) {
      value = infoObject[key];
    } else {
      value = key.includes('count') ? numberFormat(infoObject[key]) : currency(infoObject[key]);
    }

    return (
      <React.Fragment key={key}>
        <small
          className={'text-muted'}
        >
          <span className='text-primary' > {t(key)}: </span> {value}
        </small>
        <br />
      </React.Fragment>
    );
  });

const TopCategoriesCard = ({
  categories,
  header,
  onButtonClick,
  onSecondButtonClick,
  headerPostfix = ''
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>{`${t(header)}${headerPostfix}`}</CardHeader>
      <CardBody>
        <Row className='m-b-md'>
          {categories.map(({
            category_id,
            name,
            middleTitle,
            subCategoryName,
            activeCategory,
            subCategories = [],
            order_count_by_cities: places = [],
            ...rest
          }, key) => (
            <Col key={key} xs={4}>
              <h6>{name}</h6>
              <div className='h2'> {middleTitle}  </div>
              {getSubInfos(rest, t)}
              {
                !!places.length &&
                  <Button
                    size='sm'
                    outline
                    color='primary'
                    className='marginned-button'
                    onClick={() => onSecondButtonClick({ category_id, places})}
                  >
                    {t(activeCategory ?
                      'check_on_map' : 'order_count_by_cities')}
                  </Button>
              } <br />
              {
                !!subCategories.length &&
                  <Button
                    size='sm'
                    className='marginned-button'
                    outline
                    color='primary'
                    onClick={() => onButtonClick({ name, subCategories })}
                  >
                    {t(subCategoryName)}
                  </Button>
              } <br />
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

TopCategoriesCard.defaultProps = {
  onButtonClick: () => {},
  onSecondButtonClick: () => { },
};

export default TopCategoriesCard;
