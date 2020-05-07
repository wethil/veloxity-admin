import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { push } from 'connected-react-router';
import { withTranslation } from 'react-i18next';
import pick from 'lodash.pick';
import {
  Row,
  Col,
  Container,
} from 'reactstrap';

import { currency } from '../../utilities/stringUtils';

import { getBalance, getStatus } from '../../store/TopList/reducer';
import TopCategoriesCard from '../../components/TopCategoriesCard.jsx';
import TripleInfoCard from '../../components/Cards/TripleInfoCard.jsx';
import PieChartCard from '../../components/Cards/PieChartCard.jsx';

import './HomePage.scss';

const totalStatKeys = ['total_endorsement', 'total_order_count', 'total_profit'];

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTopCategory: {},
    };
  }

  getDataForPieChart = (key) => {
    const { balance } = this.props;
    const pieChartData = [];
    balance.top_categories.forEach(category => {
      pieChartData.push({
        name: category.name,
        value: category[key],
      });
    });
    return pieChartData;
  }

  getActiveTopCategory = (payload) => this.setState({ selectedTopCategory: payload })

  getCardData = (categories) => {
    const requiredKeys = [
      'endorsement',
      'total_order_count',
      'total_sold_products_count',
      'total_visitor_count',
      'order_count_by_cities'
    ];

    return categories.map(category => {
      const { name, profit, categories_in_same_order = [] } = category;
      return {
        name: name,
        middleTitle: currency(profit),
        subCategories: categories_in_same_order,
        subCategoryName: 'categories_in_same_order',
        ...pick(category, requiredKeys)
      };
    });
  }

  render() {
    const { balance, status } = this.props;
    if (!status.success) return null;
    const { selectedTopCategory } = this.state;
    const totalStatsInfo = totalStatKeys.map(key =>({
      title: key,
      amount: balance[key],
      isIncreased: true,
    }));
    const { name = null, subCategories = [] } = selectedTopCategory;
    const endorsementPie = this.getDataForPieChart('endorsement');
    const profitPie = this.getDataForPieChart('profit');
    return (
      <Container fluid>
        <Row md={12}>
          <Col md={7} >
            <TripleInfoCard infos={totalStatsInfo} />
            <TopCategoriesCard
              categories={this.getCardData(balance.top_categories)}
              header={'top_categories_by_profit'}
              onButtonClick={this.getActiveTopCategory}
            />
            {
              !!name &&
              <TopCategoriesCard
                categories={this.getCardData(subCategories)}
                header={'categories_in_same_order'}
                headerPostfix={` (${name})`}
              />
            }
          </Col>
          <Col md={5}>
            <PieChartCard
              fill={'#8884d8'}
              header={'top_three_by_endorsement'}
              data={endorsementPie}
            />
            <PieChartCard
              fill={'#1E88E5'}
              header={'top_three_by_profit'}
              data={profitPie}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balance: getBalance(state),
    status: getStatus(state),
  };
};

const mapDispatchToProps = {};

HomePage.propTypes = {
  balance: PropTypes.object,
};
const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default withTranslation()(connectedHomePage);
