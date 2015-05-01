angular.module('angularPassportApp')
    .service('EpubService', function($cookieStore) {
        var book = {};
        return {
            getValue: function() {
                return book;
            },
            setValue: function(value) {
                $cookieStore.put('book', value);
                book = value;
            }
        };

    });
