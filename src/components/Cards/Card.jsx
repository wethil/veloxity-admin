import React from 'react';
import { useTranslation } from 'react-i18next';
import {

  Card,
  CardHeader,
  CardBody,
  Progress,
} from 'reactstrap';

const ProgressCard = ({ title, count, progressValue})=> {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        {t(title)}{' '}
      </CardHeader>
      <CardBody>
        <h2 className='m-b-20 inline-block'>
          <span>{ count }</span>
        </h2>{' '}
        <i
          className='fa fa-caret-down text-danger'
          aria-hidden='true'
        />
        <Progress value={{progressValue}} color='warning' />
      </CardBody>
    </Card>
  );
};

export default ProgressCard;
