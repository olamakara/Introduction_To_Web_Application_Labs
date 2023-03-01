import { Card } from './ICard'

export const cards: Card[] = [
    {
        topic: "The Basics",
        description: "Core Angular basics you have to know",
        wholeTopicInformation: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications."
    },
    {
        topic: "Components",
        description: "Components are a core concept for building Anglar UIs and apps",
        wholeTopicInformation: "Components are the most basic UI building block of an Angular app. An Angular app contains a tree of Angular components. Angular components are a subset of directives, always associated with a template. Unlike other directives, only one component can be instantiated for a given element in a template."
    },
    {
        topic: "Events",
        description: "Events are important in Angular",
        wholeTopicInformation: "In an event binding, Angular configures an event handler for the target event. You can use event binding with your own custom events. When the component or directive raises the event, the handler executes the template statement. The template statement performs an action in response to the event."
    }
]