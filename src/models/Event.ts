interface Event {
    image: string;
    name: string;
    note: string;
    when: any;
    where: EventLocation;
}

interface EventLocation {
    name: string;
    url: string;
}

export { Event, EventLocation };
