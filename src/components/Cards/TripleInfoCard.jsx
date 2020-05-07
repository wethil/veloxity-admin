import React from 'react';
import { useTranslation } from 'react-i18next';
import { currency } from '../../utilities/stringUtils';


import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

const digitalStat = (withPercentage, amount) => !!withPercentage ? `${amount} %` : currency(amount);

const TripleInfoCard = ({ infos }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>{t('summary')}</CardHeader>
      <CardBody>
        <Row className='m-b-md'>
          {infos.map(({ title, amount, withPercentage, isIncreased }) => (
            <Col key={title} xs={4}>
              <h5>{t(title)}</h5>
              <div className='h2'>{digitalStat(withPercentage, amount)} </div>
              <small
                className={isIncreased ? 'text-success' : 'text-danger'}
              >
                {t(isIncreased ? 'increase' : 'decrease')}
              </small>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default TripleInfoCard;
