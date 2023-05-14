import React, { Component } from 'react';
import error from "../../assets/error.gif"

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    static getDerivedStateFromError(error){
        return {error: true}
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo)
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <img src={error} alt="error-gif" style={{margin: "0 auto", padding: 15}}/>
        }
        return (
           this.props.children
        );
    }
}

export default ErrorBoundary;