# Laravel CRUD API

This repository contains a simple Laravel CRUD (Create, Read, Update, Delete) API for managing a collection of items. It's designed as a starting point for building APIs in Laravel.

## Table of Contents
- [Run locally](#runlocally)
    - [Installation](#installation)
    - [Getting Started](#gettingstarted)
- [AWS Amplify Setup](#amplifysetup)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Run locally

## Getting Started


Install all the packages:

```bash
npm i
``````
Run the development server:

```bash
npm start
```
# AWS Amplify Setup

## Install the dependencies


amplify-cli
```bash
npm install -g @aws-amplify/cli
``````
configure cli:

```bash
amplify configure
```
[More info](https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/)


## Add amplify to project

Initialize amplify in your project
```bash
amplify init
```


Add api

```bash
amplify add api
```
Choose graphQl

Add function
```bash
amplify add function
```

Push your changes
```bash
amplify push
```

## Replace build file on amplify build settings with
```bash
amplify.yml
```
### Replacce the function name on line 22 with name which you had given while doing Add function step
```bash
    - npm run install:sharp --prefix  ./amplify/backend/function/{your_function}/src

```
