import React from 'react'
import { useI18n } from "../i18n/I18nContext";
import SEO from "./SEO";

const css = `
.body {
    font-family: "Open Sans",sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #455056;
    background-color: #f2f3f8;
    font-weight: 400;
}
#content {
  display: flex;
}
.errorpage.error-blank-page {
    min-height: 100vh;
    padding: 1.25rem;
}
.errorpage {
    min-height: calc(100vh - 100px);
}
.pmd-content {
    padding-top: 6rem;
}
.pmd-content, .pmd-sidebar, .wrapper {
    vertical-align: top;
}
.constructor, .pmd-content {
    position: relative;
    margin: 0;
    padding-top: 4.625rem;
    padding-left: 1.875rem;
    padding-right: 1.875rem;
    transition: all .3s cubic-bezier(.55,0,.1,1);
}
.pmd-content {
    margin-bottom: 200px;
}
.align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
}
.justify-content-center {
    -ms-flex-pack: center!important;
    justify-content: center!important;
}

.errorpage .error-page-w {
    max-width: 540px;
}
.text-center {
    text-align: center!important;
}

.mb-4, .my-4 {
    margin-bottom: 1.5rem!important;
}

.img-fluid {
    max-width: 100%;
    height: auto;
}

.h1, h1 {
    font-size: 2rem;
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-bottom: .5rem;
    font-family: Rubik,sans-serif;
    font-weight: 500;
    line-height: 1.2;
    color: #1e1e2d;
}

.btn-lg {
    padding: .625rem 2rem;
    font-size: 1rem;
    line-height: 1.3;
    border-radius: 3.125rem;
}
.btn-primary {
    color: inherit;
    border:1pt solid #1e1e2d;
    text-decoration: none;
}
.btn {
    font-weight: 700;
    text-transform: uppercase;
    padding: .625rem 1.5rem;
    font-size: .875rem;
    line-height: 1.1;
    border-radius: 3.125rem;
}
`

export default function Page404() {
    const { t } = useI18n();
    return (
        <>
        <SEO path="/404" />
        <div className='body'>
            <style>{css}</style>
            <div id="content" className="pmd-content errorpage error-blank-page d-flex justify-content-center align-items-center">
                <div className="text-center error-page-w">
                    <img src="http://themes.propeller.in/bootstrap4/html/e-health-care-admin-theme/assets/images/error-404.svg" alt="404" className="mb-4 img-fluid" />
                    <h1>{t("error404.title")}</h1>
                    <p className="mb-4">{t("error404.description")}</p>
                    <a className="btn btn-primary btn-lg pmd-btn-raised pmd-ripple-effect" href="/">{t("error404.home")}</a>
                </div>
            </div>
        </div>
        </>
    )
}
