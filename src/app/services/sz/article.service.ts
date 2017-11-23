import {Injectable} from '@angular/core';
import { CommonService } from './../common.service'
import { ArticleListService } from './article-list.service'
import { Http } from '@angular/http';


@Injectable()
export class ArticleService {
  inLoading = true;
  currentArticle;
  articleType;
  articleCode;
  totalPage;
  // player = document.getElementById('audio-player'),
  // sourceMP3 = document.getElementById('audio-src-mp3'),
  audioURL = 'http://sz-abc.com/ng/audio/';

  constructor(private http: Http) {
  }

  loadArticle(code) {
    var group = ArticleListService.getArticleGroupIndex(code),
      article = code.split('-'),
      url,// = "data\\WenZhang\\" + article[0] + "\\" + (group == undefined ? "" : "g" + group + "\\") + article[1] + "\\text.xml",
      blankCharacter = {hanZi: '', pinYin: '', shengDiao: '', 'ori_id': '', mistake: 0, index: 0, characterIndex: ''};

    this.articleType = article[0];
    this.articleCode = article[1];

    this.inLoading = true;

    url = 'assets\\data\\WenZhang\\' + this.articleType + '\\' + (group === undefined ? '' : 'g' + group + '\\') + this.articleCode + '\\text.xml';

    this.http.get(url).subscribe(
      (response) => {
        console.log('load ' + url + ' and parse the data.');
        let oParser = new DOMParser(),
          oDOM = oParser.parseFromString(response['_body'].toString(), 'text/xml'),
          pagesAttributes: any = oDOM.firstChild.attributes,
          attributes,
          ziObj,
          pageObj,
          cuePointsText,
          charCount,
          characterIndex,
          appendChars,
          i,
          cuePoint,
          attrLineSpacing = 'line_spacing',
          attrRowsPerPage = 'rows_per_page',
          attrCharactersPerRow = 'characters_per_row',
          attrPositionX = 'position_x',
          attrPositionY = 'position_y',
          attrHanZi = 'han_zi',
          attrShengDiao = 'sheng_diao',
          attrPinYin = 'pin_yin',
          attrOriginalId = 'ori_id',
          attrXuHao = 'xu_hao',
          tempChar;

        const currentArticle: any = {};
        currentArticle.pageAttributes = pagesAttributes;

        currentArticle.pageAttributes.scale = pagesAttributes.scale.value;
        currentArticle.pageAttributes.valign = pagesAttributes.valign.value;
        currentArticle.pageAttributes.halign = pagesAttributes.halign.value;
        currentArticle.pageAttributes.lineSpacing = pagesAttributes[attrLineSpacing].value;
        currentArticle.pageAttributes.charactersPerRow = pagesAttributes[attrCharactersPerRow].value;
        currentArticle.pageAttributes.rowsPerPage = pagesAttributes[attrRowsPerPage].value;
        currentArticle.pageAttributes.positionX = pagesAttributes[attrPositionX].value;
        currentArticle.pageAttributes.positionY = pagesAttributes[attrPositionY].value;
        currentArticle.pageAttributes.style = pagesAttributes.style.value;

        currentArticle.pages = [];
        for (let indexPage = 0; indexPage < oDOM.firstChild['children'].length; indexPage++) {
          let page = oDOM.firstChild['children'][indexPage];
          pageObj = {};

          pageObj.pageAttributes = {};
          pageObj.pageAttributes.align = page.attributes.align.value;
          pageObj.pageAttributes.lineSpacing = page.attributes[attrLineSpacing].value;
          pageObj.pageAttributes.scale = page.attributes.scale.value;
          pageObj.pageAttributes.positionX = page.attributes[attrPositionX].value;
          pageObj.pageAttributes.positionY = page.attributes[attrPositionY].value;
          pageObj.pageAttributes.charactersPerRow = page.attributes[attrCharactersPerRow].value;
          pageObj.pageAttributes.rowsPerPage = page.attributes[attrRowsPerPage].value;
          pageObj.pageAttributes.halign = page.attributes.halign.value;
          pageObj.pageAttributes.valign = page.attributes.valign.value;

          cuePointsText = page.getElementsByTagName('cue_points')[0].firstChild.nodeValue.replace('\n', '');

          pageObj.cuePoints = cuePointsText.split(',');

          pageObj.characters = [];
          charCount = 0;
          characterIndex = 0;

          for (let indexParagraph = 0; indexParagraph < page.getElementsByTagName('paragraph').length; indexParagraph++) {//page.getElementsByTagName('paragraph').forEach((p) => {
            let p = page.getElementsByTagName('paragraph')[indexParagraph];
            for (let indexZi = 0; indexZi < p.getElementsByTagName('zi').length; indexZi++) {
              let zi = p.getElementsByTagName('zi')[indexZi];
              attributes = zi.attributes;
              ziObj = {};

              if (attributes[attrHanZi].value === '') {
                if (charCount % currentArticle.pageAttributes.charactersPerRow > 0) {
                  appendChars = currentArticle.pageAttributes.charactersPerRow - (charCount % currentArticle.pageAttributes.charactersPerRow);
                  for (i = 0; i < appendChars; i++) {
                    tempChar =  CommonService.clone(blankCharacter);
                    tempChar.index = charCount;
                    pageObj.characters.push(tempChar);

                    charCount++;
                  }
                }
              } else {
                ziObj.hanZi = attributes[attrHanZi].value;
                if (ziObj.hanZi === '') {
                  //var p = ziObj.hanZi;
                  //ziObj.hanZi = "&nbsp;";
                }

                ziObj.shengDiao = attributes[attrShengDiao].value;
                ziObj.pinYin = attributes[attrPinYin].value;
                if (ziObj.pinYin === '') {
                  ziObj.characterIndex = '';
                } else {
                  cuePoint = pageObj.cuePoints[characterIndex];
                  pageObj.cuePoints[characterIndex] = {
                    cuePoint: +cuePoint,
                    realIndex: +attributes[attrXuHao].value,
                    pinyin: ziObj.pinYin + '_' + ziObj.shengDiao
                  };

                  ziObj.characterIndex = 'character-' + (++characterIndex);
                }

                if (attributes.id) {
                  ziObj[attrOriginalId] = attributes.id.value;
                } else {
                  ziObj[attrOriginalId] = '';
                }

                ziObj.mistakes = attributes.mistakes.value;
                ziObj.times = attributes.times.value;
                ziObj.index = attributes[attrXuHao].value;
                pageObj.characters.push(ziObj);

                //console.log("ziObj.index=" + ziObj.index + ":" + charCount);
                charCount++;
              }
            }

            if (charCount % currentArticle.pageAttributes.charactersPerRow > 0) {
              appendChars = currentArticle.pageAttributes.charactersPerRow - (charCount % currentArticle.pageAttributes.charactersPerRow);
              for (i = 0; i < appendChars; i++) {
                tempChar = CommonService.clone(blankCharacter);
                tempChar.index = charCount;
                pageObj.characters.push(tempChar);
                charCount++;
              }
            }
          }

          currentArticle.pages.push(pageObj);
        }

        this.currentArticle = currentArticle;
        this.totalPage = currentArticle.pages.length;
      },
      () => console.log('error occurs when loading content-list.json')
    );
  }

  getTotalPages() {
    return this.totalPage;
  }

  getArticleInfo() {
    return ArticleListService.getArticleInfo({type: this.articleType, code: this.articleCode});
  }

  getArticleType() {
    return this.articleType;
  }

  getArticleCode() {
    return this.articleCode;
  }

  getArticle() {
    return this.currentArticle;
  }

  getLoadingStatus() {
    return this.inLoading;
  }

  getPageCharacters(index) {
    return this.currentArticle.pages[index].characters;
  }

  getCharactersPerLine() {
    return Number(this.currentArticle.pageAttributes.charactersPerRow);
  }

  getPageTotalLines(index) {
    return this.currentArticle.pages[index].characters.length / this.getCharactersPerLine();
  }

  getPageLines(index) {
    let lines = [],
      counter = 0,
      lineCount = 0,
      characters = this.currentArticle.pages[index].characters;

    lines[0] = [];
    for (let i = 0; i < characters.length; i++) {
      counter++;
      if (counter > this.getCharactersPerLine()) {
        lineCount++;
        counter = 0;
        lines[lineCount] = [];
      }
      lines[lineCount].push(characters[i]);
    }

    return lines;
  }

  getCuePoints(index) {
    return this.currentArticle.pages[index].cuePoints;
  }

  getAudioBaseURL() {
    return this.audioURL;
  }

  getAudioURL(audioFormat) {
    let code = this.getArticleType() + '-' + this.getArticleCode(),
      group = ArticleListService.getArticleGroupIndex(code),
      article = code.split('-');

    audioFormat = audioFormat || 'mp3';

    return this.getAudioBaseURL() +  'WenZhang/' +article[0] + '/' +
      (group === undefined ? '' : 'g'+group + '/') +
      article[1] + '/' + (audioFormat === undefined ? '' : (audioFormat + '/'));
  }
}
