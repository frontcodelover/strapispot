/* _app.js */
import '../styles/globals.css'
import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import axios from 'axios'
// import getDatasFromSpotsAPI from '../components/datasParse/getDatasFromSpotsAPI';

async function getDatasFromSpotsAPI() {
  try {
    const data = await axios.get("http://localhost:1337/api/spots?populate=*");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {

    let pageProps = {};
    const response = await getDatasFromSpotsAPI();
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    
    // console.log(data)
    return { pageProps, data: response.data };
  }

  render() {
    const { Component, pageProps, data } = this.props;
    console.log(data);

    return (
      <>
        <Head>
          
        </Head>

        <Layout>
          <Component {...pageProps} data={data} />
        </Layout>
      </>
    );
  }
}