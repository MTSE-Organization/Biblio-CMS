'use client';

import CustomerChart from '@/app/statistics/_components/customer-chart';
import NewCustomerCard from '@/app/statistics/_components/new-customer-card';
import RevenueCard from '@/app/statistics/_components/revenue-card';
import RevenueChart from '@/app/statistics/_components/revenue-chart';
import StatusRatioPieChart from '@/app/statistics/_components/status-ratio-pie-chart';
import TopDiscountProductList from '@/app/statistics/_components/top-discount-product-list';
import TopSellerProductList from '@/app/statistics/_components/top-seller-product-list';
import TopViewProductList from '@/app/statistics/_components/top-view-product-list';
import { Col, Row } from '@/components/form';
import { PageWrapper } from '@/components/layout';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { Separator } from '@/components/ui/separator';

export default function StatisticsList() {
  return (
    <PageWrapper breadcrumbs={[{ label: 'Thống kê' }]}>
      <ListPageWrapper>
        {/* Statistics Card */}
        <Row className='mb-0 gap-4 p-4'>
          <Col span={5} gutter={0}>
            <RevenueCard />
          </Col>
          <Col span={5} gutter={0}>
            <NewCustomerCard />
          </Col>
        </Row>
        <Separator className='my-2' />
        {/* Status ratio pie chart */}
        <Row className='mb-0 p-4'>
          <Col gutter={0}>
            <StatusRatioPieChart />
          </Col>
        </Row>
        <Separator className='my-2' />
        {/* Revenue linechart */}
        <Row className='mb-0 p-4'>
          <Col gutter={0}>
            <RevenueChart />
          </Col>
        </Row>
        <Separator className='my-2' />
        {/* Customer linechart */}
        <Row className='mb-0 p-4'>
          <Col gutter={0}>
            <CustomerChart />
          </Col>
        </Row>
        <Separator className='my-2' />
        {/* Top view product */}
        <Row className='mb-0 px-4'>
          <Col gutter={0}>
            <TopViewProductList />
          </Col>
        </Row>
        <Separator className='my-2' />
        {/* Top discount product */}
        <Row className='mb-0 px-4'>
          <Col gutter={0}>
            <TopDiscountProductList />
          </Col>
        </Row>
        <Separator className='my-2' />
        {/* Top seller product */}
        <Row className='mb-0 px-4'>
          <Col gutter={0}>
            <TopSellerProductList />
          </Col>
        </Row>
      </ListPageWrapper>
    </PageWrapper>
  );
}
