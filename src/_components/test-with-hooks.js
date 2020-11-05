import React, {useEffect, useState, Component} from 'react';
import './test-list.css';
// import './list.less';
import {Tooltip,links,arraySorting} from './helpers'
import axios from "axios";


const loadingMessage = <span className="d-flex m-auto">Loading...</span>;

export default function Test_with_Hooks() {
    const [appState, setAppState] = useState([]);
    const [isLoading, setIsLoadingState] = useState(true);
    const [popUpInfo, setPopUpInfoState] = useState(null);
    const [listSorted, setListSortedState] = useState('dwn');
    const [listFiltered, setListFilteredState] = useState([]);

    useEffect(() => {
        axios.get(links().link1).then((resp) => {
            let result = arraySorting(resp.data);
            setAppState(result);
            setIsLoadingState(false);
        }).catch((err) => {
            console.log('ОШИБКА! Видимо что то пошло не так', err)
        });

    }, [setAppState]);

    useEffect(() => {
        setTimeout(()=>{
            let scroll = document.getElementById('mainContainer');
            if (setAppState !==[] && scroll) {
                scroll.scrollTo(0, scroll.scrollHeight)
            }
        },200)
    },[appState]);
    // Отображение подсказки по клику
    const popupInfo = (e, key, i) => {
        let popUp = <div className='popUp' style={{}}>
            <button className='popUpButton' onClick={closeBlockHandler}>х</button>
            <span>email: {i.email} &#8195;</span>
            <span>phone: {i.phone} &#8195;</span>
        </div>;
            popUp.props.style.left = e.clientX + 10 + "px";        // Координаты
            popUp.props.style.top = e.clientY - 12 + "px";
            popUp.props.style.visibility = "visible";
            tooltip.hide();
        return setPopUpInfoState(popUp);
    };
    // Функция для перехода в конец списка
    const goToEndHandler = () => {
        let scroll = document.getElementById('mainContainer');
        scroll.scrollTo(0, 0);
    };

    // Содаем экземпляр подсказки
    let tooltip = new Tooltip();

    Tooltip.prototype.hide = function () {
        this.tooltip.style.visibility = "hidden";
    };

    // Установка содержимого для подсказки и отображение
    Tooltip.prototype.show = function (text, x, y) {
        this.tooltip.innerHTML = text;             // Текст подсказки
        this.tooltip.style.left = x + "px";        // Координаты
        this.tooltip.style.top = y + "px";
        this.tooltip.style.visibility = "visible";

        // Добавление подсказки в документ если он еще не присутствует.
        if (this.tooltip.parentNode !== document.body)
            document.body.appendChild(this.tooltip);
    };

    // Функция для показа подсказки
    function mouseMoveHandler(e, i) {
        let text = i ? `${'email:   ' + i.email} ${'phone:   ' + i.phone}` : null;
        tooltip.show(text, e.clientX + 20, e.clientY - 10);
    }
    // Функция для скрытия подсказки
    function mouseOutHandler() {
        tooltip.hide();
    }
    // Функция для получения нового массива при фильтрации
    function getFiltered (e, items, category) {
        return items.filter(i => i[category] === e.target.value);
    }
    // Функция для фильтрации
    function filterByHandler(e) {
        if (e.target.name === 'firstName') {
            let resArray = getFiltered(e, appState, 'firstName');
            setListFilteredState(resArray)
        }
        if (e.target.name === 'lastName') {
            let resArray = getFiltered(e, appState, 'lastName');
            resArray.length > 0 ? setListFilteredState(resArray) : null;
        }
        if (e.target.value === '') {
            setListFilteredState([]);
        }
    }
    // Функция для скрытия подсказки по нажатию на крестик
    function closeBlockHandler() {
        tooltip.hide();
        popUpInfoHandler(null)
    }
    // Функция для изменения стейта подсказки по клику
    function popUpInfoHandler(i) {
        setPopUpInfoState(i)
    }
    // Функция для изменения порядка в списке
    function reverseSortingHandler ()  {
         let sorted;
         if (listSorted === 'dwn') {
             sorted = appState.reverse();
             setListSortedState('up');
             setAppState(sorted)
         } else {
             sorted = appState.reverse();
             setListSortedState('dwn');
             setAppState(sorted)
         }
     }
    // Функция отслеживающая скроллинг и показывает и скрывает кнопку
    function scrollHandler() {
        let container = document.getElementById('mainContainer');
        let btn = document.getElementById('buttonToDwn');
        if (container.scrollTop + container.offsetHeight < container.scrollHeight) {
            btn.style.visibility = 'visible'
        } else {
            btn.style.visibility = 'hidden'
        }
    }

    let shownState = listFiltered.length !== 0 ? listFiltered : appState;

    // Отображение строки списка
    const infoLine = appState ? shownState.map((i, key) => {
             return <li className='list'
                        key={key}
                        onClick={(e => popupInfo(e, key, i))}
                        value={i.id}
                        onMouseMove={e => mouseMoveHandler(e, i)}
                        onMouseOut={e => mouseOutHandler(i)}
             >
                 <span className='listItem'>{i.timestamp}</span>
                 <span className='listItem'>{i.firstName}</span>
                 <span className='listItem'>{i.lastName}</span>
                 <span className='listItem'>{i.message}</span>
             </li>
         }) : null;

    return <div className="rootContainer">
        {isLoading ? loadingMessage :
            <section>
                <form onChange={filterByHandler} className='topForm'> фильтровать по:
                    <input placeholder="Имя" name='firstName'/>
                    <input placeholder="Фамилия" name='lastName'/>
                </form>
                <span className='list title listTitle'>
                    <span className="listItem"> Дата &#8195;
                        <button onClick={reverseSortingHandler}>
                        {listSorted === 'dwn' ? <span> &darr;</span> : <span>&uarr;</span>}
                    </button>
                    </span>
                    <span className="listItem">Имя</span>
                    <span className="listItem">Фамилия</span>
                    <span className="listItem">Сообщение</span>
                </span>
                <ol className="listContainer" id='mainContainer' onScroll={scrollHandler}>
                    {infoLine}
                    {popUpInfo && popUpInfo}
                </ol>
                <div id='showScroll'> </div>
                <button id='buttonToDwn' onClick={(e) => goToEndHandler(e)}> в низ списка</button>
            </section>
        }
    </div >
}

