export interface InjectableDependency {
    src: string;
    inject: string | boolean;
    vendor?: boolean;
}