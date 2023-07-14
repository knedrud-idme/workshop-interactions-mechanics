import React, {useState, useRef} from "react"
import BodyClassName from "react-body-classname"
import {Helmet} from "react-helmet"
import HeaderPortal from "components/header-portal"

import "components/styles/page-submit-listing.scss"

const SubmitListingPage = () => {

    let [isFormSubmitted, setIsFormSubmitted] = useState(false)
    let [isFormDirty, setIsFormDirty] = useState(false)
    let [errorAnnouncement, setErrorAnnouncement] = useState(false)

    const [formState, setFormState] = useState({
      'sitename': '',
      'location': '',
      'fee': 0,
      'legalToCamp': true,
      'submittername': '',
      'email': '',
      'notes': ''
    })

    const submitHandler = (event) => {
        event.preventDefault()
        setIsFormSubmitted(true)

        setErrorAnnouncement('Required fields cannot be empty.')
    }

    const changeHandler = (event) => {
        const id = event.target.id
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

        setIsFormDirty(true)
        setFormState(prevState => {
            return {
                ...prevState,
                ... {
                    [id]: value
                }
            }
        })
    }

    const isInvalid = (id) => {
        return isFormSubmitted && !document.getElementById(id)?.validity.valid
    }

    return (
        <BodyClassName className="header-overlap page-submit-listing">
            <>
                <HeaderPortal>
                    <h1 className="visually-hidden">CampSpots</h1>
                </HeaderPortal>
                <section aria-labelledby="heading-about-1">
                    <header className="page-header">
                        <div className="page-header-content layout">
                            <h2 className="primary-heading h1-style" id="heading-about-1">Submit Your Spot</h2>
                        </div>
                    </header>
                    <article className="form-wrap">
                        <div className="layout">
                            <h3>Got a camping spot our community would enjoy? Tell us about it!</h3>
                            <form action="" className={isFormDirty ? 'dirty' : ''}aria-describedby="key" onSubmit={event => submitHandler(event)} noValidate>
                                <p className="error" role="alert" aria-relevant="all">{errorAnnouncement}</p>
                                <div className="two-parts-50-50">
                                    <div className="form-field">
                                        <label htmlFor="submittername">Your name <span className="asterisk" abbr="required">*</span></label>
                                        <input type="text" id="submittername" required onChange={event => changeHandler(event)} aria-invalid={isInvalid("submittername")} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">Your email address <span className="asterisk" abbr="required">*</span></label>
                                        <input type="email" id="email" pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" required onChange={event => changeHandler(event)} aria-invalid={isInvalid("email")} />
                                    </div>
                                </div>
                                <div className="two-parts-50-50">
                                    <div className="form-field">
                                        <label htmlFor="sitename">Site Name <span className="asterisk" abbr="required">*</span></label>
                                        <input type="text" id="sitename" required onChange={event => changeHandler(event)} aria-invalid={isInvalid("sitename")} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="location">Location <span className="asterisk" abbr="required">*</span></label>
                                        <input type="text" id="location" required onChange={event => changeHandler(event)} aria-invalid={isInvalid("location")} />
                                    </div>
                                </div>
                                <div className="two-parts-50-50">
                                    <div className="form-field">
                                        <label htmlFor="fee">Nightly fee</label>
                                        <input type="number" id="fee" placeholder="$" onChange={event => changeHandler(event)} aria-invalid={isInvalid("fee")} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="ownership">
                                            Can the public legally camp here? <span className="asterisk" abbr="required">*</span>
                                        </label>
                                        <input type="checkbox" id="ownership" name="ownership" value="Owned" required onChange={event => changeHandler(event)} aria-invalid={isInvalid("ownership")} />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="notes">Notes</label>
                                    <textarea id="notes"></textarea>
                                </div>
                                <p id="key" className="asterisk">* Fields are required.</p>
                                <div className="form-submit">
                                    <button className="btn-submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </article>
                </section>
            </>
        </BodyClassName>
    )
}

export default SubmitListingPage
