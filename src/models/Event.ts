interface Event {
    image: string;
    name: string;
    note: string;
    when: Date;
    where: EventLocation;
}

interface EventLocation {
    name: string;
    url: string;
}

export { Event, EventLocation };
