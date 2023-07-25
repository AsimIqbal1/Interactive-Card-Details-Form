import { ReactComponent as CardLogo } from '../assets/images/card-logo.svg'
import { ReactComponent as IconComplete } from '../assets/images/icon-complete.svg'
import validator from 'validator'
import CardFront from '../assets/images/bg-card-front.png'
import CardBack from '../assets/images/bg-card-back.png'
import './MainPage.scss';
import { useState } from 'react';

const MainPage = () => {
    const [state, setState] = useState({
        cardHolderName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: ''
    });

    const [errors, setErrors] = useState({
        cardHolderName: '',
        cardNumber: '',
        exp: '',
        cvc: ''
    });

    const [isSuccessVisibile, setIsSuccessVisibile] = useState(false);

    const onInputChange = (inputName, e) => {
        setState({
            ...state,
            [inputName]: e.target.value
        })
    }

    const onSubmit = (e) => {
        console.log("clicked")
        e.preventDefault();
        // start validating
        const errorState = errors;
        let validInput = true;
        if (validator.isEmpty(state.cardHolderName)) {
            errorState.cardHolderName = "Can't be blank"
            validInput = false;
        } else {
            errorState.cardHolderName = ''
        }

        if (validator.isEmpty(state.cardNumber)) {
            errorState.cardNumber = "Can't be blank"
            validInput = false;
        } else if (!validator.isNumeric(state.cardNumber) || state.cardNumber.length !== 16) {
            errorState.cardNumber = "Wrong format"
            validInput = false;
        } else {
            errorState.cardNumber = ''
        }

        if (validator.isEmpty(state.expMonth) || validator.isEmpty(state.expYear)) {
            errorState.exp = "Can't be blank"
            validInput = false;
        } else if (!validator.isNumeric(state.expMonth) || !validator.isNumeric(state.expYear) || state.expYear.length !== 2 || state.expMonth.length !== 2) {
            errorState.exp = "Wrong format";
            validInput = false;
        } else {
            errorState.exp = ''
        }

        if (validator.isEmpty(state.cvc)) {
            errorState.cvc = "Can't be blank"
            validInput = false;
        } else if (!validator.isNumeric(state.cvc) || state.cvc.length !== 3) {
            errorState.cvc = "Wrong format"
            validInput = false;
        } else {
            errorState.cvc = ''
        }

        setErrors({ ...errorState });
        if (validInput) setIsSuccessVisibile(true)
    }

    const formatCardNumberForUI = (number) => {
        return number.replace(/\d{4}(?=.)/g, '$& ');
    }

    return (
        <div className='container'>
            <div className="left-panel">
                <div className="cards">
                    <div className="front-card">
                        <img className='card-image' src={CardFront} alt="abcd" />
                        <div className='card-info-container'>
                            <CardLogo className='card-logo' />
                            <div className="card-content">
                                <p className="card-number">{formatCardNumberForUI(state.cardNumber) || "0000 0000 0000 0000"}</p>
                                <div className="card-details">
                                    <p className="card-holder-name">{state.cardHolderName || "Asim Iqbal"}</p>
                                    <p className="card-expiry">{state.expMonth || "00"} / {state.expYear || "00"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="back-card">
                        <img className='card-image' src={CardBack} alt="abcd" />
                        <p className='cvv'>{state.cvc || "000"}</p>
                    </div>
                </div>
            </div>
            {isSuccessVisibile ?
                <div className="complete-container interactive-section">
                    <IconComplete />
                    <h1 className='greetings'>Thank you!</h1>
                    <p className='info-text'>We've added your card details.</p>
                    <button className='button'>Continue</button>

                </div>
                : <form className="form-container interactive-section" onSubmit={onSubmit}>
                    <section className='input-container'>
                        <p className='input-heading'>Card Holder Name</p>
                        <input
                            onChange={(e) => onInputChange('cardHolderName', e)}
                            className={`inputbox ${errors.cardHolderName ? 'error' : ''}`}
                            placeholder='e.g. Jane Appleseed'
                            maxLength={30}
                        />
                        {errors.cardHolderName && <p className="error-message">{errors.cardHolderName}</p>}
                    </section>
                    <section className='input-container'>
                        <p className='input-heading'>Card Number</p>
                        <input
                            onChange={(e) => onInputChange('cardNumber', e)}
                            className={`inputbox ${errors.cardNumber ? 'error' : ''}`}
                            placeholder='e.g. 1234 5678 9123 0000'
                            maxLength={16}
                        />
                        {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

                    </section>

                    <section className='input-container row-direction'>
                        <section className='dates-container'>
                            <p className='input-heading'>Exp. Data (MM/YY)</p>
                            <div className="dates-input-container">
                                <input
                                    onChange={(e) => onInputChange('expMonth', e)}
                                    className={`inputbox ${errors.exp ? 'error' : ''}`}
                                    placeholder='MM'
                                    maxLength={2}
                                />
                                <input
                                    onChange={(e) => onInputChange('expYear', e)}
                                    className={`inputbox ${errors.exp ? 'error' : ''}`}
                                    placeholder='YY'
                                    maxLength={2}
                                />
                            </div>
                            {errors.exp && <p className="error-message">{errors.exp}</p>}
                        </section>
                        <section>
                            <p className='input-heading'>CVC</p>
                            <input
                                onChange={(e) => onInputChange('cvc', e)}
                                className={`inputbox ${errors.cvc ? 'error' : ''}`}
                                placeholder='e.g. 123'
                                maxLength={3}
                            />
                            {errors.cvc && <p className="error-message">{errors.cvc}</p>}
                        </section>


                    </section>
                    <button type="submit" className='button'>Confirm</button>
                </form>}

        </div>
    )
}

export default MainPage;