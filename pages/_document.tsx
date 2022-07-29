import { createGetInitialProps } from '@mantine/next';
import NextDocument from 'next/document';

const getInitialProps = createGetInitialProps();

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps;
}
