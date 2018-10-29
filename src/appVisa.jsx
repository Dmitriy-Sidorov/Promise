import React, { Component } from "react";
import { ApplyForVisa } from "./visa";

const applyForVisa = new ApplyForVisa();

export default class AppVisa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            vacation: {
                visa: null,
                hotel: null,
                ticket: null,
                error: null
            }
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => this.fetchData());
    }

    fetchData() {
        applyForVisa
            .fetch()
            .then(response => {
                response &&
                    this.setState({
                        isLoading: false,
                        vacation: {
                            visa: response.data
                        }
                    });
            })
            .then(this.bookHotel)
            .then(this.buyTickets)
            .catch(e => {
                this.setState({
                    isLoading: false,
                    vacation: {
                        error: e.error.message
                    }
                });
            });
    }

    bookHotel = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0
                    ? resolve(
                          this.setState({
                              isLoading: false,
                              vacation: {
                                  hotel: "Отель забронирован"
                              }
                          })
                      )
                    : reject(
                          this.setState({
                              isLoading: false,
                              vacation: {
                                  error: "Нет мест"
                              }
                          })
                      );
            }, 2000);
        });
    };

    buyTickets = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0
                    ? resolve(
                          this.setState({
                              isLoading: false,
                              vacation: {
                                  ticket: "Билет куплен"
                              }
                          })
                      )
                    : reject(
                          this.setState({
                              isLoading: false,
                              vacation: {
                                  error: "Билетов нет, снимаем бронь"
                              }
                          })
                      );
            }, 2000);
        });
    };

    renderErrorState() {
        const {
            vacation: { error }
        } = this.state;

        return (
            <div className="error">
                <span>{error}</span>
            </div>
        );
    }

    renderLoadingState() {
        return <span className="downloading">Downloading....</span>;
    }

    renderSuccessfulState() {
        const { visa, hotel, ticket } = this.state.vacation;

        return (
            <div>
                <div className="successful">{visa}</div>
                <div className="successful">{hotel}</div>
                <div className="successful">{ticket}</div>
            </div>
        );
    }

    render() {
        console.log("render", this.state.vacation);

        const {
            isLoading,
            vacation: { visa, hotel, ticket, error }
        } = this.state;

        if (isLoading) {
            return this.renderLoadingState();
        }

        if (!!error) {
            return this.renderErrorState();
        }

        return this.renderSuccessfulState();
    }
}
