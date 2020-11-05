import React,{Component} from 'react';
import './test-list.css';
// import './list.less';
import {Tooltip,links,arraySorting} from './helpers';
import './list.less';
import axios from "axios";

 class Test_with_Classes extends Component {
     constructor(props) {
         super(props);
         this.state = {
             appState: null,
             isLoading: true,
             popUpInfo: null,
             tooltip: new Tooltip(),
             sorted: 'dwn',
             filtered: [],
             showBtn:false
         }
     }
     componentDidMount() {
         axios.get(links().link2).then((resp) => {
             let result = arraySorting(resp.data);
             this.setAppState(result)
         }).catch((err) => {
             console.log('Ошибка самая что ни на есть', err)
         });
     }
     componentDidUpdate(prevState) {
         let scroll = document.getElementById('mainContainer');
         if (this.state.appState !== prevState.appState) {scroll.scrollTo(0, scroll.scrollHeight)}
     };
     // Установка стейта
     setAppState = (data) => {
         this.setState({appState: data, isLoading: false,showBtn:false})
     };
     // Функция для перехода в конец списка
     goToEndHandler = () => {
         let scroll = document.getElementById('mainContainer');
         scroll.scrollTo(0, 0);
     };
     // Функция для показа подсказки
     mouseMoveHandler = (e, i) => {
         let text = i ? `${'email:   ' + i.email} ${'phone:   ' + i.phone}` : null;
         this.state.tooltip.show(text, e.clientX + 20, e.clientY - 10);
     };
     // Функция для скрытия подсказки
     mouseOutHandler = () => {
         this.state.tooltip.hide();
     };
     // Функция для получения нового массива при фильтрации
     getFiltered = (e, items, category) => {
         return items.filter(i => i[category] === e.target.value);
     };
     // Функция для фильтрации
     filterByHandler = (e) => {
         if (e.target.name === 'firstName') {
             let resArray = this.getFiltered(e, this.state.appState, 'firstName');
             this.setState({filtered: resArray})
         }
         if (e.target.name === 'lastName') {
             let resArray = this.getFiltered(e, this.state.appState, 'lastName');
             resArray.length > 0 ? this.setState({filtered: resArray}) : null;
         }
         if (e.target.value === '') {
             this.setState({filtered: [], resArray: []})
         }
     };
     // Функция для скрытия подсказки по нажатию на крестик
     closeBlockHandler = () => {
         this.state.tooltip.hide();
         this.popUpInfoHandler(null)
     };
     // Отображение подсказки по клику
     popupInfo = (e, key, i) => {
         let popUp = <div className='popUp' style={{}}>
             <button   className='popUpButton' onClick={(e) => this.closeBlockHandler(e)}>х</button>
             <span>email: {i.email} &#8195;</span>
             <span>phone: {i.phone} &#8195;</span>

         </div>;

         this.state.tooltip.hide();
         popUp.props.style.left = e.clientX + 10 + "px";        // Координаты
         popUp.props.style.top = e.clientY - 12 + "px";
         popUp.props.style.visibility = "visible";
         this.popUpInfoHandler(popUp);
         return popUp;

     };
     // Функция для изменения стейта подсказки по клику
     popUpInfoHandler = (i) => {
         this.setState({popUpInfo: i})
     };
     // Функция для изменения порядка в списке
     reverseSortingHandler = () => {
         let sorted;
         if (this.state.sorted === 'dwn') {
             sorted = this.state.appState.reverse();
             this.setState({sorted: 'up', appState: sorted});
         } else {
             sorted = this.state.appState.reverse();
             this.setState({sorted: 'dwn', appState: sorted});
         }
     };
    // Функция отслеживающая скроллинг и показывает и скрывает кнопку
     scrollHandler = () => {
         let container = document.getElementById('mainContainer');
         let btn = document.getElementById('buttonToDwn');
         if (container.scrollTop + container.offsetHeight < container.scrollHeight ) {
             btn.style.visibility = 'visible'
         } else {
             btn.style.visibility = 'hidden' }
     };

     render() {
         const {appState, isLoading, sorted, filtered, popUpInfo,showBtn} = this.state;

         //Отображение загрузки
         const loadingMessage = <div className='loadingMessage'>Loading...</div>;

         let shownState = filtered.length !== 0 ? filtered : appState;

         // Отображение строки списка
         const infoLine = appState ? shownState.map((i, key) => {
             return <li className='list'
                        key={key}
                        onClick={(e => this.popupInfo(e, key, i))}
                        value={i.id}
                        onMouseMove={e => this.mouseMoveHandler(e, i)}
                        onMouseOut={e => this.mouseOutHandler(i)}
             >
                 <span className='listItem'>{i.timestamp}</span>
                 <span className='listItem'>{i.firstName}</span>
                 <span className='listItem'>{i.lastName}</span>
                 <span className='listItem'>{i.message}</span>
             </li>
         }) : null;

         // Установка содержимого для подсказки и отображение
         Tooltip.prototype.show = function (text, x, y) {
             this.tooltip.innerHTML = text;             // Текст подсказки
             this.tooltip.style.left = x + 'px';        // Координаты
             this.tooltip.style.top = y + 'px';
             this.tooltip.style.visibility = 'visible';

         };

         // Функция для скрытия подсказки
         Tooltip.prototype.hide = function () {
             this.tooltip.style.visibility = 'hidden';
         };

         return <div className='rootContainer'>
             {isLoading ? loadingMessage :
                 <section>
                     <form onChange={this.filterByHandler} className='topForm'> фильтровать по:
                         <input placeholder="Имя" name='firstName'/>
                         <input placeholder="Фамилия" name='lastName'/>
                     </form>
                     <span className='list title listTitle'>
                                 <span className="listItem">Дата &#8195;
                                     <button onClick={this.reverseSortingHandler}>
                                         {sorted === 'dwn' ? <span> &darr;</span> : <span>&uarr;</span> }
                                         </button>
                                 </span>
                         <span className="listItem">Имя</span>
                         <span className="listItem">Фамилия</span>
                         <span className="listItem">Сообщение</span>
                     </span>
                     <ol className="listContainer" id='mainContainer' onScroll={this.scrollHandler}>
                         { infoLine }
                         {popUpInfo && popUpInfo}
                     </ol>
                     <div id='showScroll'> </div>
                     <button id ='buttonToDwn' onClick={(e) => this.goToEndHandler(e)}> в низ списка</button>
                 </section>
             }
         </div>
     }
 }

 export default Test_with_Classes