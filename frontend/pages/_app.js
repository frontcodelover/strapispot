/* _app.js */
import '../styles/globals.css'
import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}