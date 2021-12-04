# mc-names 😎

<p align="center">
  <a href="https://nodei.co/npm/mc-names/"><img src="https://nodei.co/npm/mc-names.png?compact=true"></a><br>
  <a href="https://github.com/tekoh/mc-names/actions/workflows/codeql-analysis.yml"><img src="https://github.com/tekoh/mc-names/actions/workflows/codeql-analysis.yml/badge.svg"></a>
  <a href="https://github.com/tekoh/mc-names/actions/workflows/ci.yml"><img src="https://github.com/tekoh/mc-names/actions/workflows/ci.yml/badge.svg"></a>
</p>

![image of basic usage](https://i.imgur.com/PSYRqQ4.png)

<hr>

### name history
```js
const { getNameHistory } = require("mc-names")

getNameHistory("coolguy").then(console.log)/*
Account {
  uuid: '52c00c8807b94b22818175de2d7569b1',
  username: 'coolguy',
  history: [
    PreviousName { username: 'coolguy', date: 1566919470000 },  
    PreviousName { username: 'DeidreDud', date: 1563931718000 },
    PreviousName { username: 'coolguy', date: 1546866352000 },  
    PreviousName { username: 'CoolGuy', date: 1499160765000 },  
    PreviousName { username: 'Heiley', date: 1495828197000 },   
    PreviousName { username: 'DrSyndrome', date: 1473603401000 },
    PreviousName { username: 'T_The_Gamer', date: undefined }
  ]
}
*/
```

### skins
```js
const { getSkin } = require("mc-names")

getSkin("coolguy").then(console.log)/*
Skin {
  head: 'https://mc-heads.net/avatar/52c00c8807b94b22818175de2d7569b1',
  full: 'https://mc-heads.net/player/52c00c8807b94b22818175de2d7569b1',
  download: 'https://mc-heads.net/skin/52c00c8807b94b22818175de2d7569b1',
  render: 'https://visage.surgeplay.com/full/52c00c8807b94b22818175de2d7569b1',    
  headRender: 'https://visage.surgeplay.com/head/52c00c8807b94b22818175de2d7569b1',
  optifineCape: 'http://s.optifine.net/capes/coolguy.png',
  mineconCape: undefined
}
*/
```
