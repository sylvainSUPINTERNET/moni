import { Subject } from "rxjs"

export const onMessageService = ( event: MessageEvent, subject:Subject<any> ): void => {
    subject.next("YIKES")
}