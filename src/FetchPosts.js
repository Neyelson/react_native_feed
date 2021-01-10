import React, { Component } from 'react';

export default class FetchPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
      }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });        
    }

    render() {

        var { isLoaded, items} = this.state;

        if (!isLoaded) {
            return (
                <div>carregando...</div>
            );
        }

        return (
            <div>carregado</div>
        );
    }

}