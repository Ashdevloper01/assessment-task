import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ProductTreeView} from '../src/screens';

// Mock data for testing
const mockData = [
  {
    id: 1,
    category_name: 'Phones',
    devices_count: '200 + iPhone 6 and 2.5k other',
    children: [
      {
        id: 2,
        brand_name: 'Apple',
        children: [
          {
            id: 3,
            model_name: 'iPhone 6',
            children: [
              {
                id: 4,
                variant_name: '128GB',
                devices_count: 200,
                model_id: 3,
              },
              {
                id: 5,
                variant_name: '256GB',
                devices_count: 100,
                model_id: 3,
              },
              {
                id: 6,
                variant_name: '512GB',
                devices_count: 50,
                model_id: 3,
              },
            ],
          },
        ],
      },
    ],
  },
];

describe('ProductTreeView', () => {
  test('renders product tree correctly', () => {
    const {getByText} = render(<ProductTreeView data={mockData} />);
    // Check if the main header is rendered
    const headerElement = getByText('Browse Product');
    expect(headerElement).toBeDefined();

    // Check if a category is rendered
    const categoryElement = getByText('Phones');
    expect(categoryElement).toBeDefined();
    expect(categoryElement).toBeTruthy();
  });

  it('expands and collapses items', () => {
    const {getByText, queryByText} = render(
      <ProductTreeView data={mockData} />,
    );

    // Check if category starts collapsed
    let brandElement = queryByText('Apple');
    expect(brandElement).toBeNull();

    const categoryExpandableElement = getByText('Phones');
    fireEvent.press(categoryExpandableElement);
    brandElement = getByText('Apple');
    expect(brandElement).toBeDefined();

    // Check if brand starts collapsed
    let modelElement = queryByText('iPhone 6');
    expect(modelElement).toBeNull();

    const brandExpandableElement = getByText('Apple');
    fireEvent.press(brandExpandableElement);
    modelElement = getByText('iPhone 6');
    expect(modelElement).toBeDefined();

    // Check if model starts collapsed
    let variantElement = queryByText('128GB');
    expect(variantElement).toBeNull();

    const modelExpandableElement = getByText('iPhone 6');
    fireEvent.press(modelExpandableElement);
    variantElement = getByText('128GB');
    expect(variantElement).toBeDefined();

    // Collapse the model
    fireEvent.press(modelExpandableElement);
    variantElement = queryByText('128GB');
    expect(variantElement).toBeNull();

    // Collapse the brand
    fireEvent.press(brandExpandableElement);
    modelElement = queryByText('iPhone 6');
    expect(modelElement).toBeNull();

    // Collapse the category
    fireEvent.press(categoryExpandableElement);
    brandElement = queryByText('Apple');
    expect(brandElement).toBeNull();
  });

  test('selects variants correctly', () => {
    const {getByTestId, queryByText} = render(
      <ProductTreeView data={mockData} />,
    );
    const variantCheckbox = getByTestId('1');
    fireEvent.press(variantCheckbox);
    // Check if the variant checkbox is checked
    expect(variantCheckbox.props.checked).toBeFalsy();
    // Check if variant is selected
    expect(queryByText('Selected Variants')).toBeDefined();
    expect(queryByText('iPhone 6 128GB')).toBeDefined();
  });

  test('handles checkbox selection correctly', () => {
    const {getByTestId, queryByTestId} = render(
      <ProductTreeView data={mockData} />,
    );
    const categoryCheck = getByTestId('1');
    expect(categoryCheck).toBeDefined();
    fireEvent.press(categoryCheck);
    expect(categoryCheck).toBeTruthy();
    const brandCheck = queryByTestId('2');
    expect(brandCheck).toBeDefined();
    expect(brandCheck).toBeNull();
    expect(queryByTestId('3')).toBeNull();
    expect(queryByTestId('4')).toBeNull();
  });
});
