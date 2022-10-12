<?php

?>
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Style youself</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link rel="stylesheet" href="./style.css">

</head>
<body>
<!-- partial:index.partial.html -->
<div class="no-props">
  <p>Your browser doesn't support CSS Custom Properties. 😭</p>
</div>

<div id="app" :style="{'--skin-shade': lightness, '--hair-color': picked.currentColor}">
  <main>
    <person :currenthairdo="picked.currentStyle" ref="person"></person>
    <skintone :shade="picked.skinShade" @changeshade="updateShade($event)"></skintone>
    <hair-styles :selected="picked.currentStyle"></hair-styles>
    <hair-color :color="picked.currentColor" @changecolor="updateColor($event)"></hair-color>
    <save :saveimg="downloadImg">
    </save>
  </main>
</div>

<!-- component templates -->

<!-- header -->
<template id="header-temp">
  <header>
    <hair-icon hairdo="ponytail"></hair-icon>
    <h1>{{title}}</h1>
  </header>  
</template>

<!-- character -->
<template id="person-temp">
   <div role="img" aria-label="css-drawn character dynamically updated through choices you make for skin color, hair style, and hair color" class="person__container">
    <div aria-hidden="true" class="person">
      <div :class="['head', currenthairdo]">
        
        <div class="eyes">
          <div class="eye eye--left">
          </div>
        <div class="eye eye--right"></div>
        </div>
        <div class="hair">
          <div class="hair__bangs"></div>
          <div class="hair__add-on"></div>
        </div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div>
      <div class="neck"></div>
      <div class="shirt"></div>
    </div>
  </div>
</template>

<!-- skintone range  -->
<template id="skin-temp">
  <div class="skin">
    <label for="skin-picker" class="sr-only">Skin color
    </label>
    <span id="skin-shade-desc" class="sr-only">Values are from darkest to lightest shade.</span>
   <input aria-describedby="skin-shade-desc" class="skin-range" type="range" min="2" max="9" id="skin-picker" step=".5" :value="shade" @input="changeShade">
  </div>
</template>

<!-- group of styles -->
<template id="styles-temp">
  <div role="radiogroup" aria-labelledby="hair-group" class="styles">
    <span id="hair-group" class="sr-only">Hairstyles</span>
    <hair-style v-for="hairdo in hairdos" :hairdo="hairdo" :selected="selected" @changestyle="updateStyle($event)" :key="hairdo.name"></hair-style>
  </div>
</template>

<!-- individual styles -->
<template id="style-temp">
      <label :class="['style-choice', selected === hairdo.name ? 'selected' : '']">
        <span class="sr-only">{{hairdo.desc}}</span>
        <input class="style-choice__input sr-only" type="radio" name="hair-style" :id="hairdo.name" :checked="hairdo.name == selected"  :value="hairdo.name" @change="changeStyle">
        <span class="style-choice--focus"></span>
        <hair-icon :hairdo="hairdo.name"></hair-icon>
      </label>
</template>

<!-- hair style icon -->
<template id="hair-icon-temp">
  <div aria-hidden="true" :class="['style-choice', hairdo]">
    <div class="style-choice__head">
      <div class="style-choice__hair"></div>
    </div>
  </div>
</template>

<!--  haircolor picker  -->
<template id="haircolor-temp">
  <label for="haircolor-picker" :class="['haircolor', isText ? '--is-text' : '']">
    <span class="sr-only">Haircolor</span>
    <input :class="['haircolor__input', !isText ? 'sr-only' : '']" type="color" id="haircolor-picker" :value="color" @input="changeColor" :placeholder="isText ? color : ''">
    <span class="haircolor__display"></span>
  </label>  
</template>

<template id="save-temp">
  <button v-if="canSave" class="download" @click="saveimg">
    <span class="download__flex">
      <span class="download__icon" aria-hidden="true">
       <svg id="icon-download" viewBox="0 0 26 28" class="download__icon-svg">
         <linearGradient id="static-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fdbcbc"/>
          <stop offset="100%" stop-color="#97d6d3"/>
        </linearGradient>
        <linearGradient id="focus-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#97d6d3"/>
          <stop offset="100%" stop-color="#fdbcbc"/>
        </linearGradient>
        <title>download </title>
        <path d="M20 21c0-0.547-0.453-1-1-1s-1 0.453-1 1 0.453 1 1 1 1-0.453 1-1zM24 21c0-0.547-0.453-1-1-1s-1 0.453-1 1 0.453 1 1 1 1-0.453 1-1zM26 17.5v5c0 0.828-0.672 1.5-1.5 1.5h-23c-0.828 0-1.5-0.672-1.5-1.5v-5c0-0.828 0.672-1.5 1.5-1.5h7.266l2.109 2.125c0.578 0.562 1.328 0.875 2.125 0.875s1.547-0.313 2.125-0.875l2.125-2.125h7.25c0.828 0 1.5 0.672 1.5 1.5zM20.922 8.609c0.156 0.375 0.078 0.812-0.219 1.094l-7 7c-0.187 0.203-0.453 0.297-0.703 0.297s-0.516-0.094-0.703-0.297l-7-7c-0.297-0.281-0.375-0.719-0.219-1.094 0.156-0.359 0.516-0.609 0.922-0.609h4v-7c0-0.547 0.453-1 1-1h4c0.547 0 1 0.453 1 1v7h4c0.406 0 0.766 0.25 0.922 0.609z"></path>
        </svg>
      </span>
      <span class="download__text">        		 download avatar
      </span>
    </span>
  </button>
</template>
<!-- partial -->
  <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js'></script><script  src="./script.js"></script>

</body>
</html>
