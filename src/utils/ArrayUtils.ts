import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IArrayUtils } from '../interfaces/utils/IArrayUtils';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

@injectable()
export class ArrayUtils implements IArrayUtils {
    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        this.randomGenerator = randomGenerator;
    }

    /**
     * @param {number} length
     * @returns {number[]}
     */
    public createWithRange (length: number): number[] {
        const range: number[] = [];

        for (let i: number = 0; i < length; i++) {
            range.push(i);
        }

        return range;
    }

    /**
     * @param {T[]} array
     * @returns {T | null}
     */
    public findMostOccurringElement <T extends string | number> (array: T[]): T | null {
        const arrayLength: number = array.length;

        if (!arrayLength) {
            return null;
        }

        const elementsMap: Partial<{[key in T]: number}> = {};

        let mostOccurringElement: T = array[0];
        let mostOccurringElementCount: number = 1;

        for (const element of array) {
            const currentElementCount: number = elementsMap[element] ?? 0;
            const updatedElementCount: number = currentElementCount + 1;

            if (updatedElementCount > mostOccurringElementCount) {
                mostOccurringElement = element;
                mostOccurringElementCount = updatedElementCount;
            }

            elementsMap[element] = updatedElementCount;
        }

        return mostOccurringElement;
    }

    /**
     * @param {T[]} array
     * @param {number} times
     * @returns {T[]}
     */
    public rotate <T> (array: T[], times: number): T[] {
        if (!array.length) {
            throw new ReferenceError(`Cannot rotate empty array.`);
        }

        if (times <= 0) {
            return array;
        }

        const newArray: T[] = array;

        let temp: T | undefined;

        while (times--) {
            temp = newArray.pop();

            if (temp) {
                newArray.unshift(temp);
            }
        }

        return newArray;
    }

    /**
     * @param {T[]} array
     * @returns {T[]}
     */
    public shuffle <T> (array: T[]): T[] {
        const shuffledArray: T[] = [...array];

        for (let i: number = shuffledArray.length; i; i--) {
            const j: number = Math.floor(this.randomGenerator.getMathRandom() * i);

            [shuffledArray[i - 1], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i - 1]];
        }

        return shuffledArray;
    }
}
