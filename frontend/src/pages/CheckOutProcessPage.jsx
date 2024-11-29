// import { Stepper, Typography, Step, StepLabel } from '@material/core'
import React, { Fragment } from 'react'
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import MetaData from '../components/MetaData'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'

const CheckOutProcessPage = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ]
    const stepStyle = {
        boxSizing: "border-box"
    }
    return (
        <Fragment>
             {/* <MetaData title="Checkout" /> */}
            <div className='py-10'>
                <Stepper alternativeLabel activeStep={activeStep} >
                    {steps.map((item, index) => (
                        <Step key={index} active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{ color: activeStep >= index ? "#FE4C50" : "rgba(0,0,0,0.649)" }}
                                icon={item.icon}
                            >
                                {item.label}
                            </StepLabel>


                        </Step>
                    ))}

                </Stepper>
            </div>
        </Fragment>
    )
}

export default CheckOutProcessPage
