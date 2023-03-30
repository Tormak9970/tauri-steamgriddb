![npm (scoped)](https://img.shields.io/npm/v/@tormak/tor-model-locator?label=version&logo=npm&color=red)
![npm](https://img.shields.io/npm/dm/@tormak/tor-model-locator?logo=npm)

# Tor Model Locator

This tool is intended to be used to parse output from the various tools I have designed for TORCommunity.com. It copies the textures and models into a predictable file structure for ease of use.

## Install

Using npm:

```console
npm install @tormak/tor-model-locator
```

## Usage

**Note**: These examples use typescript files (.ts) but can still be implimented the same way for javascript files (.js).


```js
import { locate } from '@tormak/tor-model-locator';

const dataFolder = "path to data folder";

const extractFolder = "path to a SWTOR asset extraction";

const success = locate(dataFolder, extractFolder);

if (success) console.log("Location complete!");
```