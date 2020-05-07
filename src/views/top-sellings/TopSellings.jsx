import React, { Component } from 'react';
import pick from 'lodash.pick';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


import { numberFormat } from '../../utilities/stringUtils';
import { getTopSelling } from '../../store/TopList/reducer';


import TopCategoriesCard from '../../components/TopCategoriesCard.jsx';

import {
  Row,
  Container,
  Col
} from 'reactstrap';

import MapCard from '../../components/Cards/MapCard.jsx';
import './TopSellings.scss';

class TopSellingsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTopCategory: {},
      places: [],
      activeCategory: 0
    };
  }

  getActiveTopCategory = (payload) => {
    this.setState({ selectedTopCategory: payload }, () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  getPlaces = ({ category_id, places}) => {
    this.setState({ places, activeCategory: category_id });
  }

  getCardData = (categories) => {
    const { activeCategory } = this.state;
    const requiredKeys = [
      'category_id',
      'average_price',
      'pageview_count',
      'order_count_by_cities',
      'category_name',
      'order_count',
    ];

    return categories.map(category => {
      const {
        name,
        order_count,
        total_order_count,
        products_in_same_order = [],
        category_id
      } = category;
      const amount = order_count || total_order_count;
      return {
        name: name,
        middleTitle: numberFormat(amount),
        subCategories: products_in_same_order,
        subCategoryName: 'products_in_same_order',
        activeCategory: activeCategory === category_id,
        ...pick(category, requiredKeys)
      };
    });
  }
  render() {
    const { selectedTopCategory, places } = this.state;
    const { name = null, subCategories = [] } = selectedTopCategory;
    const { topSelling } = this.props;
    return (
      <Container fluid>
        <Row md={12}>
          <div className='mapContainer' >
            <MapCard places={places} />
          </div>
        </Row>
        <Row md={12}>
          <Col md={12} >
            <TopCategoriesCard
              categories={this.getCardData(topSelling)}
              header={'top_selling_list'}
              onButtonClick={this.getActiveTopCategory}
              onSecondButtonClick={this.getPlaces}
            />
            {
              !!subCategories.length &&
              <TopCategoriesCard
                ref={this.subCatRef}
                categories={this.getCardData(subCategories)}
                header={'products_in_same_order'}
                headerPostfix={` (${name})`}
              />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topSelling: getTopSelling(state),
  };
};

const mapDispatchToProps = {};

const TopSelling = connect(mapStateToProps, mapDispatchToProps)(TopSellingsPage);

export default withTranslation()(TopSelling);
